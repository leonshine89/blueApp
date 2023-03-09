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
import { fetchMetadata } from "../helpers/function"
import { useCancellableQuery } from "../hooks/useCancellabeQuery"
import { AuthContext } from "./auth"

export const PostContextProvider = ({ children }) => {
  const [postParam, setPostParam] = useState({})
  const { primaryProfile, address } = useContext(AuthContext)
  const [post, setPost] = useState([])
  const [comments, setComments] = useState([])
  const [subscribePosts, setSubscribePosts] = useState([])
  const [subData, setSubData] = useState([])
  const [obj, setObj] = useState({})
  const [objArr, setObjArr] = useState([])

  // const [allSub, setAllSub] = useState([])

  // console.log(postParam)

  const fetchPost = async (address, QUERY_PARAM) => {
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

        data.forEach(async (el) => {
          let obj = {}
          if (el?.node.body !== "") {
            const hash = el?.node.body
            const body = await fetchMetadata(hash)
            obj = { ...el?.node, body: body }
          }

          console.log(obj)
          setPost((prev) =>
            [...prev, obj].sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt)
            })
          )
        })
        console.log(post)
        // setPost(data)
      } catch (e) {
        console.log(e)
      }
    }

    fetch()
  }, [address])

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
        console.log(res)
        const subPost = res?.data?.address?.wallet?.subscribings?.edges
        console.log(subPost)
        // for (let i = 0; i < subPost.length; i++) {
        //   const element = subPost[i]
        //   const address = element?.node?.profile?.owner?.address
        //   console.log(address)
        //   const res = await fetch(address, GET_POST_BY_ADDRESS)
        //   console.log(res)
        //   // console.log("Res is here")
        //   const data = res?.data?.address?.wallet?.primaryProfile?.posts?.edges
        //   console.log(data)
        //   setSubData(data)
        //   data.forEach(async (el) => {
        //     // console.log(el?.node)
        //     let obj = {}
        //     if (el?.node?.body !== "") {
        //       const hash = el?.node.body
        //       const body = await fetchMetadata(hash)
        //       obj = { ...el?.node, body: body }
        //     } else {
        //       obj = el?.node
        //     }
        //     console.log(obj)
        //     setPost((prev) => [...prev, obj])
        //     setSubscribePosts((prev) => [...prev, el?.node])
        //   })
        //   // console.log(subscribePosts)
        // }
        subPost.forEach(async (el) => {
          const address = el?.node?.profile?.owner?.address
          const res = await fetchPost(address, GET_POST_BY_ADDRESS)
          const data = res?.data?.address?.wallet?.primaryProfile?.posts?.edges
          // console.log(data)
          console.log(data)
          data.forEach(async (el) => {
            let obj = {}
            if (el?.node?.body !== "") {
              const hash = el?.node?.body
              const body = await fetchMetadata(hash)
              obj = { ...el?.node, body: body }
            } else {
              obj = el?.node
            }
            console.log(el)
            setPost((prev) => [...prev, obj])
          })
        })
      } catch (e) {
        console.log(e.message)
        // alert(e.message)
      }
    }

    fetchSubscribers()
  }, [address])

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
        obj,
        subData,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}
