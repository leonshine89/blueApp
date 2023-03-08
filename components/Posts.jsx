import {
  collection,
  Firestore,
  onSnapshot,
  query,
  QuerySnapshot,
} from "firebase/firestore"
import React, { useContext, useEffect, useState } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { PostContext } from "../context/post"
import { db } from "../firebase"
import { GET_POST } from "../graphql/getPost"
import { useCancellableQuery } from "../hooks/useCancellabeQuery"
import Post from "./Post"
import { AuthContext } from "../context/auth"
import { GET_POST_BY_ADDRESS } from "../graphql/getPostByAddress"

const Posts = () => {
  const { postParam, post, setPost } = useContext(PostContext)
  const { profileHandle, profileImage } = useContext(AuthContext)

  // get post
  useEffect(() => {
    if (!postParam) return
    let query
    let postObj = {}
    console.log(postParam.contentID)
    const fetch = async () => {
      try {
        const id = postParam?.contentID
        query = useCancellableQuery({
          query: GET_POST,
          variables: {
            id: id,
          },
        })
        const res = await query
        console.log(res?.data?.content?.body)
        postObj = res?.data?.content
        setPost((prev) =>
          [...prev, postObj].sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
          })
        )
      } catch (e) {
        console.log(e)
      }
    }

    fetch()
  }, [postParam])

  return (
    <div>
      {post.map((post) => {
        // console.log(post.body[0])s
        return (
          <Post
            key={post.contentID}
            name={post.authorHandle || profileHandle}
            message={post.title}
            email={post.email}
            timestamp={post.createdAt}
            image={profileImage}
            postImage={post.body}
            id={post.contentID}
          />
        )
      })}
    </div>
  )
}

export default React.memo(Posts)
