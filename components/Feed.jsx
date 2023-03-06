import React from "react"
import InputBox from "./InputBox"
import Posts from "./Posts"
import Stories from "./Stories"

const Feed = () => {
  return (
    <div className="relative h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto scrollbar-hide">
      <div className="mx-auto max-w-md md:max-w-2xl ">
        {/* Storied */}
        <Stories />
        <InputBox />
        <Posts />
      </div>
    </div>
  )
}

export default Feed
