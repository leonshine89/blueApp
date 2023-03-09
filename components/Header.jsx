import Image from "next/image"
import React, { useContext } from "react"
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid"
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline"
import HeaderIcon from "./HeaderIcon"
import { signOut, useSession } from "next-auth/react"
import { AuthContext } from "../context/auth"
import detectEthereumProvider from "@metamask/detect-provider"
import { PostContext } from "../context/post"

function Header() {
  const { showChat, setShowChat } = useContext(PostContext)
  const disconect = async () => {
    const provider = await detectEthereumProvider()
    console.log(provider)
    if (provider) {
      provider.close()
      localStorage.clear()
      window.location.reload()
    }
  }

  const { primaryProfile, profileHandle, profileImage } =
    useContext(AuthContext)

  const src = primaryProfile.avatar
    ? primaryProfile.avatar
    : "https://imgs.search.brave.com/6FnuC9ucTueo6fu1ZlwWDtqFhX62s8A5ngX8qMwB2Lk/rs:fit:600:600:1/g:ce/aHR0cHM6Ly9zdDMu/ZGVwb3NpdHBob3Rv/cy5jb20vOTk5ODQz/Mi8xMzMzNS92LzQ1/MC9kZXBvc2l0cGhv/dG9zXzEzMzM1MjA4/OC1zdG9jay1pbGx1/c3RyYXRpb24tZGVm/YXVsdC1wbGFjZWhv/bGRlci1wcm9maWxl/LWljb24uanBn"
  return (
    <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
      {/***left */}
      <div className="flex items-center">
        {/* <Image src={"https://links.papareact.com/5me"} width={40} height={40} />
        h1 */}
        <h1 className="text-2xl text-white font-bold p-2 rounded-full bg-blue-700 shadow-xl ">
          bA
        </h1>
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            className="hidden md:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink"
            type="text"
            placeholder="Search Facebook"
          />
        </div>
      </div>

      {/***Center */}

      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon Icon={HomeIcon} active={true} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={ViewGridIcon} />
        </div>
      </div>

      {/***Right */}
      <div className="flex items-center sm:space-x-2 justify-end">
        <Image
          onClick={disconect}
          className="rounded-full cursor-pointer"
          src={profileImage}
          width={"40"}
          height={"40"}
        />
        <p className="font-semibold pr-3 whitespace-nowrap">{profileHandle}</p>
        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" onClick={() => setShowChat(true)} />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" />
      </div>
    </div>
  )
}

export default Header
