import { useQuery } from "@apollo/client"
import { async } from "@firebase/util"
import React, { createContext, useContext, useEffect, useState } from "react"
import {
  GET_COMMENT_BY_ADDRESS,
  GET_SUBSCRIBER_BY_ADDRESS,
  GET_SUBSCRIBER_BY_PROFILE,
} from "../graphql"

export const PostContext = createContext()

PostContext.displayName = "AuthContext"
import { GET_POST } from "../graphql/getPost"
import { GET_POST_BY_ADDRESS } from "../graphql/getPostByAddress"
import { useCancellableQuery } from "../hooks/useCancellabeQuery"
import { AuthContext } from "./auth"

export const PostContextProvider = ({ children }) => {
  const [postParam, setPostParam] = useState({})
  const { primaryProfile, address } = useContext(AuthContext)
  const [post, setPost] = useState([])
  const [comments, setComments] = useState([])
  const [subscribePosts, setSubscribePosts] = useState([])
  const [select, setSelect] = useState(false)
  const [subData, setSubData] = useState([])

  // console.log(postParam)

  const fetch = async (address, QUERY_PARAM) => {
    let query
    try {
      query = useCancellableQuery({
        query: QUERY_PARAM,
        variables: {
          address: address,
        },
      })
      const res = await query

      return res
    } catch (e) {
      console.log(e)
    }
  }

  // fetch post by address
  useEffect(() => {
    let query
    let postObj = {}
    const fetch = async () => {
      try {
        query = useCancellableQuery({
          query: GET_POST_BY_ADDRESS,
          variables: {
            address: address,
          },
        })
        const res = await query
        const data = res?.data?.address?.wallet?.primaryProfile?.posts?.edges
        data.forEach((el) => {
          setPost((prev) => [...prev, el?.node])
        })
        // setPost(data)
      } catch (e) {
        console.log(e)
      }
    }

    fetch()
  }, [primaryProfile])

  // fetch Comments
  useEffect(() => {
    let queryComment
    let postObj = {}
    const fetchComment = async () => {
      try {
        queryComment = useCancellableQuery({
          query: GET_COMMENT_BY_ADDRESS,
          variables: {
            address: address,
          },
        })
        const res = await queryComment
        const commentCount =
          res?.data?.address?.wallet?.primaryProfile?.commentCount
        const data = res?.data?.address?.wallet?.primaryProfile?.comments?.edges

        setComments(data)
      } catch (e) {
        console.log(e)
      }
    }

    fetchComment()
  }, [primaryProfile])

  // fetch subscribers
  useEffect(() => {
    let querySub
    console.log("Hello Subscribers")
    const fetchSubscribers = async () => {
      try {
        querySub = useCancellableQuery({
          query: GET_SUBSCRIBER_BY_ADDRESS,
          variables: {
            address: address,
          },
        })
        const res = await querySub
        const subPost = res?.data?.address?.wallet?.subscribings?.edges
        for (let i = 0; i < subPost.length; i++) {
          const element = subPost[i]
          const address = element?.node?.profile?.owner?.address
          console.log(address)
          const res = await fetch(address, GET_POST_BY_ADDRESS)
          console.log(res)
          const data = res?.data?.address?.wallet?.primaryProfile?.posts?.edges
          console.log(data)
          setSubData(data)
          console.log(subData)
          data.forEach((el) => {
            console.log(el?.node)
            setPost((prev) => [...prev, el?.node])
            setSubscribePosts((prev) => [...prev, el?.node])
          })

          console.log(subscribePosts)
          // setPost((prev) => [...prev])s
        }
        // setPost((prev) => [...prev, subPost])
        console.log(subPost)
      } catch (e) {
        console.log(e.message)
        // alert(e.message)
      }
    }

    fetchSubscribers()
  }, [primaryProfile])

  return (
    <PostContext.Provider
      value={{
        postParam,
        setPostParam,
        post,
        setPost,
        comments,
        setComments,
        setSubscribePosts,
        subscribePosts,
        select,
        setSelect,
        subData,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}
