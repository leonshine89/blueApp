import Image from "next/image"
import React, { useContext, useState } from "react"
import { UserAddIcon } from "@heroicons/react/solid"
import { AuthContext } from "../context/auth"
import { Contract } from "ethers"
import { PROFILE_NFT_ABI, PROFILE_NFT_ADDRESS } from "../constants"
import CyberConnect, { Env } from "@cyberlab/cyberconnect-v2"
import { PostContext } from "../context/post"
const Friend = ({ name, src, profileID }) => {
  const { connectWallet, checkNetwork, provider, address } =
    useContext(AuthContext)
  const { select, setSelect } = useContext(PostContext)
  const handleOnClick = async () => {
    try {
      const provider = await connectWallet()

      await checkNetwork(provider)

      const signer = provider.getSigner()
      const address = await signer.getAddress()

      const contract = new Contract(
        PROFILE_NFT_ADDRESS,
        PROFILE_NFT_ABI,
        signer
      )

      const tx = await contract.subscribe(
        {
          profileIds: [profileID],
        },
        [0x0],
        [0x0]
      )

      await tx.wait()
      setSelect(true)
    } catch (e) {
      console.log(e.message)
    }
  }

  const cyberConnect = new CyberConnect({
    namespace: "blueApp",
    env: Env.STAGING,
    provider: provider,
    signingMessageEntity: "blueApp",
  })

  return (
    <div
      className={`bg-white border rounded-md shadow-md h-60 overflow-hidden mr-3`}
    >
      <div className="w-full">
        <Image
          src="https://imgs.search.brave.com/F9Z22z34e1XfrAXE2nT4FFHAKbUt2F-SFMSCZr-V2k8/rs:fit:1104:1100:1/g:ce/aHR0cHM6Ly9taXJv/Lm1lZGl1bS5jb20v/bWF4LzExMDQvMSpD/SHRLNzNsZGtxZFdT/WU1QX245SkxRLnBu/Zw"
          width={100}
          height={100}
          className="w-full h-[50%]"
        />
      </div>

      <h1 className="text-base font-medium p-3">
        {name.replace(/.cyber\b/g, "")}
      </h1>

      <div
        className="flex items-center p-2 text-sm bg-blue-100 rounded-md m-2 cursor-pointer hover:bg-gray-300 "
        onClick={handleOnClick}
      >
        <UserAddIcon className="h-4 w-4 text-blue-600" />
        <p className="text-blue-600 font-normal ">Add Friend</p>
      </div>
    </div>
  )
}

export default Friend
