import React from "react"
import Friends from "./Friends"
import InputBox from "./InputBox"
import Posts from "./Posts"
import Stories from "./Stories"

const Feed = () => {
  return (
    <div className="relative h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto scrollbar-hide w-[30%]">
      <div className="mx-auto w-full">
        {/* Storied */}
        <Stories />
        <InputBox />
        <Friends />
        <Posts />
      </div>
    </div>
  )
}

export default Feed
