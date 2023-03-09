import React, { useContext, useEffect, useMemo, useRef, useState } from "react"
import {
  ChatAltIcon,
  ShareIcon,
  EmojiHappyIcon,
  CameraIcon,
  PhotographIcon,
  ChartBarIcon,
  ChatAlt2Icon,
  ChatIcon,
} from "@heroicons/react/outline"
import { ThumbUpIcon } from "@heroicons/react/solid"
import Image from "next/image"
import { AuthContext } from "../context/auth"
import CyberConnect, { Env } from "@cyberlab/cyberconnect-v2"
import { useCancellableQuery } from "../hooks/useCancellabeQuery"
import {
  GET_COMMENT,
  GET_COMMENT_BY_ADDRESS,
  GET_LIKE_BY_POST_ID,
} from "../graphql"
import Comment from "./Comment"
import { GET_LIKE_BY_ADDRESS } from "../graphql/getLikeByAddress"
import { PostContext } from "../context/post"

const Post = ({ name, message, email, timestamp, image, postImage, id }) => {
  const { profileImage, provider, profileHandle, address, primaryProfile } =
    useContext(AuthContext)
  const { comments, setComments, obj } = useContext(PostContext)
  const [commentArr, setCommentArr] = useState([])
  const [comment, setComment] = useState("")
  const commentRef = useRef("")
  const [likeBlue, setLikeBlue] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [likeArr, setLikeArr] = useState([])

  const cyberconnect = new CyberConnect({
    namespace: "blueApp",
    env: Env.STAGING,
    provider: provider,
    signingMessageEntity: "blueApp",
  })

  const onComment = () => {
    commentRef.current.focus()
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    const content = {
      title: "",
      body: comment,
      author: profileHandle,
    }
    const handleComment = cyberconnect.createComment(id, content)
    //    console.log(handleComment);
    const cpComment = handleComment.then(async (data) => {
      try {
        let query
        const id = data.contentID
        console.log(id)
        query = useCancellableQuery({
          query: GET_COMMENT,
          variables: {
            id: id,
          },
        })
        const res = await query
        console.log(res)
        setCommentArr((prev) =>
          [...prev, res?.data?.content].sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
          })
        )
      } catch (e) {
        console.log(e)
      }
    })
    setComment("")
  }

  const likePost = async () => {
    console.log("Liked")
    const like = cyberconnect.like(id)
    like.then(async (data) => {
      if (data.status == "SUCCESS") {
        let query
        try {
          query = useCancellableQuery({
            query: GET_LIKE_BY_POST_ID,
            variables: {
              id: id,
              address,
              address,
            },
          })
          const res = await query
          const like = res?.content?.likedStatus?.liked
          if (like) {
            setLikeCount((prev) => prev++)
            console.log(likeCount)
          }
        } catch (e) {
          console.log(e)
        }
      }
    })
    setLikeBlue(true)
  }
  useEffect(() => {
    let query
    let postObj = {}

    const fetch = async () => {
      try {
        query = useCancellableQuery({
          query: GET_LIKE_BY_ADDRESS,
          variables: {
            address: address,
            contentType: "POST",
          },
        })
        const res = await query
        const data = res?.data?.address?.likes?.edges
      } catch (e) {
        console.log(e.message)
        console.log(address)
      }
    }

    fetch()
  }, [])

  useEffect(() => {
    let arr = []
    for (let i = 0; i < comments.length; i++) {
      const element = comments[i]
      if (element?.node?.target?.title == message) {
        arr.push(element?.node)
      }
    }
    setCommentArr((prev) => [...prev, ...arr])
  }, [primaryProfile])

  console.log(postImage)
  // const thisImage = postImage[0]
  return (
    <div className="flex flex-col bg-white mb-4 mt-5 rounded-t-md">
      <div className="p-5 mt-5 rounded-t-2xl shadow-sm">
        <div className="flex items-center space-x-2">
          <img
            src={image}
            width={40}
            height={40}
            className="rounded-full"
            alt=""
          />
          <div>
            <p className="font-medium">{name.replace(/.cyber\b/g, "")}</p>
            {timestamp && (
              <p className="text-xs text-gray-400">
                {new Date(timestamp).toDateString()}
              </p>
            )}
            {/* <p className='text-xs text-gray-400'>{timestamp}</p> */}
          </div>
        </div>
        <p className="pt-4">{message}</p>
      </div>

      {postImage && (
        <div className="relative h-56 md:96 bg-white">
          <Image src={postImage[0]} fill={true} />
        </div>
      )}

      <div className="flex w-full justify-between pr-5">
        <div className="flex items-center relative pl-5 py-2">
          <Image src={"/facebook.svg"} width={20} height={20} />
          <Image
            src={"/love.svg"}
            width={20}
            height={20}
            className="absolute left-8"
          />
          <p className="absolute left-14">{likeCount}</p>
        </div>
        <div className="flex items-center text-gray-500">
          <p>0</p>
          <ChatAlt2Icon className="h-5 w-5" />
        </div>
      </div>

      {/* footer of the post  */}

      <div className="flex justify-between items-center border-b bg-white shadow-md text-gray-400 border-t">
        <div className="inputIcon rounded-none">
          <ThumbUpIcon
            className={`h-5 ${likeBlue ? "text-blue-700" : ""}`}
            onClick={likePost}
          />
          <p className="text-xs sm:text-base">Like</p>
        </div>

        <div className="inputIcon rounded-none" onClick={onComment}>
          <ChatAltIcon className="h-5" />
          <p className="text-xs sm:text-base">Comment</p>
        </div>

        <div className="inputIcon rounded-none ">
          <ShareIcon className="h-5" />
          <p className="text-xs sm:text-base">Share</p>
        </div>

        <div></div>
      </div>

      <div className="h-fit w-full bg-white rounded-br-2xl rounded-bl-2xl overflow-hidden p-5 ">
        <div className="flex items-center h-10">
          <Image
            src={profileImage}
            className="object-cover rounded-full mr-2 "
            width={30}
            height={30}
          />
          <form
            action=""
            onSubmit={(e) => onSubmit(e)}
            className="bg-gray-100 flex items-center w-full rounded-full pr-4"
          >
            <input
              type="text"
              className="inputForm bg-gray-100 focus:outline-none p-3 h-full flex-grow rounded-full"
              placeholder="Write a comment..."
              ref={commentRef}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <EmojiHappyIcon className="commentIcon" />
            {/* <ChatAltIcon className='commentIcon' /> */}
            <CameraIcon className="commentIcon" />
            <PhotographIcon className="commentIcon" />
            <ChartBarIcon className="commentIcon" />

            <button className="hidden">submit</button>
          </form>
        </div>

        {commentArr.map((comment) => {
          return (
            <Comment
              handle={profileHandle}
              body={comment.body || comment.node.body}
              image={profileImage}
            />
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(Post)
