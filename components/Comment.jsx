import Image from "next/image"
import React from "react"

const Comment = ({ handle, image, body }) => {
  return (
    <div className="flex items-center m-3">
      <Image
        src={image}
        className="object-cover rounded-full"
        width={30}
        height={30}
      />
      <div className="bg-gray-100 p-2 rounded-lg ml-2 text-[14px] ">
        <p className="font-bold">{handle.replace(/.cc\b/g, "")}</p>
        <p>{body}</p>
      </div>
    </div>
  )
}

export default Comment
