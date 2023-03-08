import { async } from "@firebase/util"
import { CameraIcon, XIcon, PhotographIcon } from "@heroicons/react/solid"
import { Contract } from "ethers"
import Image from "next/image"
import React, { use, useContext, useEffect, useRef, useState } from "react"
// import { v4 as uuidv4 } from "uuid";
import { v4 as uuidv4 } from "uuid"
import { HashLoader } from "react-spinners"
import { PROFILE_NFT_ABI, PROFILE_NFT_ADDRESS } from "../constants"
import { AuthContext } from "../context/auth"

import CyberConnect, { Env } from "@cyberlab/cyberconnect-v2"
import { useMutation, useQuery } from "@apollo/client"
import { PostContext } from "../context/post"
import { GET_POST } from "../graphql/getPost"
import { client, fetchMetadata } from "../helpers/function"

const CreatePost = () => {
  const {
    profileImage,
    profileHandle,
    accessToken,
    createPost,
    setCreatePost,
    primaryProfile,
    connectWallet,
    checkNetwork,
    provider,
  } = useContext(AuthContext)

  const { postParam, setPostParam } = useContext(PostContext)
  const [imageToPost, setImageToPost] = useState("")
  const [loading, setLoading] = useState()
  const fileRef = useRef("")
  const [post, setPost] = useState("")
  const [paint, setPaint] = useState("#fff")
  const [badgeInput, setBadgeInput] = useState({
    nftImageURL: "",
    title: "",
    venue: "",
    date: Number(Date.now()),
  })
  const [postArr, setPostArr] = useState([])

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result)
    }
  }

  console.log(imageToPost)

  const removeImage = () => {
    setImageToPost(null)
  }

  const cyberConnect = new CyberConnect({
    namespace: "blueApp",
    env: Env.STAGING,
    provider: provider,
    signingMessageEntity: "blueApp",
  })

  const publishPost = async ({}) => {
    try {
      //   const svg_data = getEssenceSVGData()
      setLoading(true)

      // const ipfHash = await pinJSONToIPFS(metadata);
      const someData = new Blob([imageToPost])
      const ipfsHash = await client.storeBlob(someData)
      console.log(ipfsHash)

      const content = {
        title: post,
        body: ipfsHash,
        author: profileHandle,
      }

      const cpost = cyberConnect.createPost(content)
      //   const image = fetchMetadata(ipfsHash)
      //   console.log(image)
      cpost.then((data) => setPostParam(data))

      setCreatePost(false)
      setLoading(false)
    } catch (e) {
      console.log(e)
      throw Error
    }
  }
  //   console.log(postParam)s

  return (
    <div className="absolute shadow-xl top-0 bottom-0 left-0 right-0  z-10  flex flex-col justify-center items-center before">
      <div className="bg-[#fff] w-1/2 lg:w-4/12 shadow-2xl h-fit rounded-lg flex flex-col">
        <div className="flex w-full justify-center items-center border-b px-5 py-3">
          <h1 className="lg:mx-32 font-medium mx-10 lg:text-2xl text-base ">
            Create A Post
          </h1>
          <XIcon
            onClick={() => setCreatePost(false)}
            className="h-7 w-7 p-1 bg-gray-200 rounded-full cursor-pointer hover:bg-slate-300 "
          />
        </div>

        <div className="flex p-5 items-center">
          <Image
            src={profileImage}
            width={40}
            height={40}
            className="rounded-full mr-2"
          />
          <h1 className="font-medium text-base capitalize">{profileHandle}</h1>
        </div>

        <div className="px-5">
          <input
            className="inputForm h-20 w-full focus:outline-none placeholder:lg:text-2xl text-base"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            placeholder={`What is on your mind, ${profileHandle}?`}
          />
          {imageToPost && (
            <div
              onClick={removeImage}
              className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
            >
              <img
                src={imageToPost}
                className="h-40 w-full object-contain"
                alt=""
              />
              <p className="text-xs text-red-500 text-center">Remove</p>
            </div>
          )}

          <div
            className="cursor-pointer flex items-center"
            onClick={() => fileRef.current.click()}
          >
            <PhotographIcon className="h-9 text-green-400" />
            <span className="text-gray-500">Select Image</span>
            <br />
            <input onChange={addImageToPost} type="file" hidden ref={fileRef} />
          </div>
        </div>

        <div className="p-5">
          <button
            disabled={!post}
            className={` md:p-3 ${
              !post ? "bg-gray-200" : "bg-green-500 hover:bg-green-600"
            }  text-xl font-semibold rounded-xl w-full text-white cursor-pointer overflow-hidden`}
            onClick={() => publishPost({ ...badgeInput })}
          >
            {loading ? (
              <HashLoader
                color={paint}
                loading={loading}
                // cssOverride={override}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Create Post"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
