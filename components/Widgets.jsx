import React, { useContext } from "react"
import { DotsHorizontalIcon, VideoCameraIcon } from "@heroicons/react/solid"
import { SearchIcon } from "@heroicons/react/outline"
import Contact from "./Contact"
import { AuthContext } from "../context/auth"

const Widgets = () => {
  const { pProfiles } = useContext(AuthContext)
  console.log(pProfiles)
  return (
    <div className="hidden lg:flex flex-col w-60 p-2 mt-5">
      <div className="flex justify-between items-center text-gray-500 mb-5">
        <h2 className="text-xl">Contacts</h2>
        <div className="flex space-x-2">
          <VideoCameraIcon className="h-6" />
          <SearchIcon className="h-6" />
          <DotsHorizontalIcon className="h-6" />
        </div>
      </div>
      {pProfiles.map((contact) => {
        return (
          <Contact
            key={contact.id}
            name={contact.handle.replace(/.cyber\b/g, "")}
          />
        )
      })}
    </div>
  )
}

export default Widgets
