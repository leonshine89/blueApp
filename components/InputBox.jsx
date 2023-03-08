import { useSession } from "next-auth/react"
import Image from "next/image"
import React, { useContext, useRef, useState } from "react"
import { EmojiHappyIcon } from "@heroicons/react/outline"
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid"
import { db, storage, store } from "../firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import firebase from "firebase/app"
import { getStorage, ref } from "firebase/storage"
import { AuthContext } from "../context/auth"
import CreatePost from "./CreatePost"
const InputBox = () => {
  const {
    primaryProfile,
    profileHandle,
    profileImage,
    createPost,
    setCreatePost,
  } = useContext(AuthContext)
  const [imageToPost, setImageToPost] = useState("")
  const inputRef = useRef("")
  const filePickerRef = useRef("")
  const sendPost = async (e) => {
    e.preventDefault()
    if (!inputRef.current.value) return
    //

    // const collectionRef = collection(db, 'posts')
    // await addDoc(collectionRef, {
    //     message: inputRef.current.value,
    //     name: session.user.name,
    //     // email: session.user.email,
    //     image: session.user.image,
    //     timestamp: serverTimestamp()
    // }).then(doc => {
    //     if(imageToPost) {
    //         // funky upload
    //         const uploadTask = ref(`posts/${doc.id}`).toString(imageToPost, 'data_url')
    //         console.log(uploadTask);

    //         removeImage();

    //         uploadTask.on('state_change', null, error => console.error(error), () => {
    //             // When the upload complete
    //             store.ref('posts').child(doc.id).getDownloadURL().then(url => {
    //                 db.collectionRef('posts').doc(doc.id).set({
    //                     postImage: url
    //                 }, {merge: true})
    //             })
    //         })
    //     }
    // })

    inputRef.current.value = ""
  }
  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result)
    }
  }

  const removeImage = () => {
    setImageToPost(null)
  }

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          src={profileImage}
          width={40}
          height={40}
        />
        <form className="flex flex-1">
          <input
            type="text"
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none cursor-pointer hover:bg-gray-200"
            onClick={() => setCreatePost(true)}
            ref={inputRef}
            placeholder={`What's on your mind, ${profileHandle}?`}
          />

          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>

        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img src={imageToPost} className="h-10 object-contain" alt="" />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>

      <div className="flex justify-evenly p-3 border-t ">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>

        <div className="inputIcon" onClick={() => setCreatePost(true)}>
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm">Photo/Video</p>
          <input
            onChange={addImageToPost}
            type="file"
            hidden
            ref={filePickerRef}
          />
        </div>

        <div className="inputIcon" onClick={() => setCreatePost(true)}>
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm">Feeling/Activity</p>
        </div>
      </div>
    </div>
  )
}

export default InputBox
