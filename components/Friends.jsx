import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth"
import { PostContext } from "../context/post"
import Friend from "./Friend"

const Friends = () => {
  const { pProfiles, setPProfiles, primaryProfile, allSub, setAllSub, arr } =
    useContext(AuthContext)
  const { subscribePosts, setSubscribePosts } = useContext(PostContext)
  const [subProfiles, setSubProfiles] = useState([])
  // console.log(subscribePosts)
  // console.log(allSub)

  return (
    <div className="bg-white mt-4 pb-4 w-full overflow-auto">
      <h1 className="text-xl py-5 px-3 text-gray-500 ">People You May Know</h1>
      <div className="flex ml-4 mb-5 w-full overflow-auto scrollbar-hide ">
        {allSub.map((profile) => {
          if (profile.profileID !== primaryProfile?.profileID) {
            return (
              <Friend
                key={profile.handle}
                profileID={profile.profileID}
                name={profile.handle}
                src={profile.avatar}
              />
            )
          }
        })}
      </div>
    </div>
  )
}

export default Friends
