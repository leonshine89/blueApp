import React, { useContext } from "react"
import { AuthContext } from "../context/auth"
import { PostContext } from "../context/post"
import Friend from "./Friend"

const Friends = () => {
  const { pProfiles, setPProfiles, primaryProfile, allSub, setAllSub } =
    useContext(AuthContext)
  const { subscribePosts, setSubscribePosts } = useContext(PostContext)
  console.log(subscribePosts)
  console.log(allSub)

  return (
    <div className="bg-white mt-4 pb-4 w-full">
      <h1 className="text-xl py-5 px-3 text-gray-500 ">People You May Know</h1>
      <div className="flex ml-4 mb-5 w-full overflow-auto scrollbar-hide ">
        {pProfiles.map((profile) => {
          if (primaryProfile.profileID !== profile.profileID) {
            return (
              <Friend
                key={profile.handle}
                profileID={profile.profileID}
                name={profile.handle}
                src={profile}
              />
            )
          }
        })}
      </div>
    </div>
  )
}

export default Friends
