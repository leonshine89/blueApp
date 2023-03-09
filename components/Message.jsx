import Image from "next/image"
import React, { useContext } from "react"
import {
  PhoneIcon,
  VideoCameraIcon,
  MinusIcon,
  XIcon,
  PlusCircleIcon,
  PhotographIcon,
  DocumentAddIcon,
  EmojiHappyIcon,
  ThumbUpIcon,
} from "@heroicons/react/solid"
import { PostContext } from "../context/post"

const Message = () => {
  const { showChat, setShowChat } = useContext(PostContext)
  return (
    <div className="absolute w-[23%] h-fit bottom-0 right-20 bg-white rounded-md ">
      {/* top */}
      <div className="flex w-full items-center shadow-md p-4">
        <Image
          src={
            "https://imgs.search.brave.com/LunWusATox8mdj5ifGCiGCSlUuZj7jYyI_-LEBWhKk8/rs:fit:1069:1069:1/g:ce/aHR0cHM6Ly9idWNr/ZXRlZXItZTA1YmJj/ODQtYmFhMy00Mzdl/LTk1MTgtYWRiMzJi/ZTc3OTg0LnMzLmFt/YXpvbmF3cy5jb20v/cHVibGljL2ltYWdl/cy9hNDQ2Zjg5Ny1j/ZTlkLTQxZjMtYjdi/MS1iMzc0NzAxNzRk/ZmVfMTA2OXgxMDY5/LmpwZWc"
          }
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div className="flex flex-col items-start ml-2 flex-grow">
          <h1 className="font-medium">Stephen McCall</h1>
          <p className="text-gray-300 text-xs">Active </p>
        </div>

        <div className="flex text-blue-700 items-center">
          <PhoneIcon className="messageIcon" />
          <VideoCameraIcon className="messageIcon" />
          <MinusIcon className="messageIcon" />
          <XIcon className="messageIcon" onClick={() => setShowChat(false)} />
        </div>
      </div>
      {/* Body  */}
      <div className="flex flex-col p-5 w-full items-center mb-16">
        <Image
          src={
            "https://imgs.search.brave.com/LunWusATox8mdj5ifGCiGCSlUuZj7jYyI_-LEBWhKk8/rs:fit:1069:1069:1/g:ce/aHR0cHM6Ly9idWNr/ZXRlZXItZTA1YmJj/ODQtYmFhMy00Mzdl/LTk1MTgtYWRiMzJi/ZTc3OTg0LnMzLmFt/YXpvbmF3cy5jb20v/cHVibGljL2ltYWdl/cy9hNDQ2Zjg5Ny1j/ZTlkLTQxZjMtYjdi/MS1iMzc0NzAxNzRk/ZmVfMTA2OXgxMDY5/LmpwZWc"
          }
          width={100}
          height={100}
          className="rounded-full object-cover h-15 w-15"
        />
        <h1 className="text-xl font-medium">Stephen McCall</h1>
        <p className="text-gray-500 text-sm">Your Friend on blueApp</p>
      </div>
      {/* footer  */}
      <div className="flex w-full items-center mb-3 p-3 ">
        <div className="flex flex-grow">
          <PlusCircleIcon className="messageIcon h-7" />
          <PhotographIcon className="messageIcon h-7" />
          <DocumentAddIcon className="messageIcon h-7" />
        </div>

        <div className="flex items-center w-[50%] p-3 h-10 bg-gray-200 overflow-hidden rounded-full">
          <input
            type="text"
            className="bg-gray-200 outline-none focus:outline-none w-[80%] border-none"
          />
          <EmojiHappyIcon className="messageIcon h-7" />
        </div>
        <ThumbUpIcon className="messageIcon h-7" />
      </div>
    </div>
  )
}

export default Message
