import Image from "next/image"
import React, { useContext, useState } from "react"
import { UserAddIcon } from "@heroicons/react/solid"
import { AuthContext } from "../context/auth"
import { Contract } from "ethers"
import { PROFILE_NFT_ABI, PROFILE_NFT_ADDRESS } from "../constants"
import CyberConnect, { Env } from "@cyberlab/cyberconnect-v2"
import { PostContext } from "../context/post"
import HashLoader from "react-spinners/HashLoader"

const Friend = ({ name, src, profileID }) => {
  const { connectWallet, checkNetwork, provider, address } =
    useContext(AuthContext)
  const [select, setSelect] = useState(false)
  const [loading, setLoading] = useState(false)
  const imageArr = [
    "https://imgs.search.brave.com/Ue7UYN7LYXzmX8gUZCHKjl8CwE6modu6UFtAvjt8aQs/rs:fit:440:440:1/g:ce/aHR0cHM6Ly9tZWRp/YS5ob3dyYXJlLmlz/L2ltYWdlcy9kYS8y/ZmRjMjYxMzhlYmVl/OGQzZWI2YzdiYmY0/YTZhNDhkNy5qcGc",
    "https://imgs.search.brave.com/ui6uM6rJaoKRrN8BY_pbqU1mHlqJBrmQ8sHsvWUpc_0/rs:fit:440:440:1/g:ce/aHR0cHM6Ly9tZWRp/YS5ob3dyYXJlLmlz/L2ltYWdlcy9kYS9i/N2Y2NTU1YjgxMDQ3/MDllYWMxZDMxNjdl/OTRjOGI1OS5qcGc",
    "https://imgs.search.brave.com/Te8EHqqGPrRb3ex9zKhwxbuIeAhshG8XVU0LinpNKqM/rs:fit:1200:720:1/g:ce/aHR0cHM6Ly9zdGF0/aWMubmV3cy5iaXRj/b2luLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMS8wOC90/cm9vcC1vZi1ib3Jl/ZC1hcGUtbmZ0cy1y/aXNlcy1hYm92ZS10/aGUtY29tcGV0aXRp/b24tbmZ0LXByb2pl/Y3QtZG9uYXRlcy0y/MDBrLWluLWV0aC10/by1vcmFuZ3V0YW4t/b3V0cmVhY2guanBn",
    "https://imgs.search.brave.com/lGh5KMmqIfcEtrelkZy_TluVjtjnE2QMVGNumflfp9g/rs:fit:440:440:1/g:ce/aHR0cHM6Ly9tZWRp/YS5ob3dyYXJlLmlz/L2ltYWdlcy9kYS84/YWU2MjEwNTY4NGEz/OTk1ODgxZTZjM2Y2/NjJiYWQ3MC5qcGc",
    "https://imgs.search.brave.com/LgUTU2RcB1oxosAiZ2AK7WIyKczO93zATimoV4pkSto/rs:fit:400:400:1/g:ce/aHR0cHM6Ly9haXJu/ZnRzLnMzLmFtYXpv/bmF3cy5jb20vbmZ0/LWltYWdlcy8yMDIy/MDQxMi9EZWdlbl9h/cGVfdGVzdF8yXzE2/NDk3NTAwMDE3MzAu/cG5n",
    "https://imgs.search.brave.com/eVeEG13qKPe6XsVLrajdz_JjNo5HWOmskLN-ypXMmuc/rs:fit:440:440:1/g:ce/aHR0cHM6Ly9tZWRp/YS5ob3dyYXJlLmlz/L2ltYWdlcy9kYS85/Njg1MTgyMWUyODcx/NTJlM2M2OGFkY2E4/MTU0YmRiYS5qcGc",
    "https://imgs.search.brave.com/LunWusATox8mdj5ifGCiGCSlUuZj7jYyI_-LEBWhKk8/rs:fit:1069:1069:1/g:ce/aHR0cHM6Ly9idWNr/ZXRlZXItZTA1YmJj/ODQtYmFhMy00Mzdl/LTk1MTgtYWRiMzJi/ZTc3OTg0LnMzLmFt/YXpvbmF3cy5jb20v/cHVibGljL2ltYWdl/cy9hNDQ2Zjg5Ny1j/ZTlkLTQxZjMtYjdi/MS1iMzc0NzAxNzRk/ZmVfMTA2OXgxMDY5/LmpwZWc",
  ]

  const randNum = () => {
    return Math.floor(Math.random() * imageArr.length - 1)
  }

  const handleOnClick = async () => {
    try {
      setLoading(true)
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
      setLoading(false)
    } catch (e) {
      console.log(e.message)
      setLoading(false)
      throw Error
    }
  }

  const cyberConnect = new CyberConnect({
    namespace: "blueApp",
    env: Env.STAGING,
    provider: provider,
    signingMessageEntity: "blueApp",
  })
  console.log(randNum())

  return (
    <div
      className={`bg-white border rounded-md shadow-md h-60 mr-3 overflow-hidden ${
        select == false ? "block" : "hidden"
      }`}
    >
      <div className="w-full">
        <Image
          src={imageArr[randNum()]}
          width={100}
          height={100}
          className="w-full h-[50%]"
        />
      </div>

      <h1 className="text-base font-medium p-3">
        {name.replace(/.cyber\b/g, "")}
      </h1>

      <div
        className="flex items-center justify-center p-2 text-sm bg-blue-100 rounded-md m-2 cursor-pointer hover:bg-gray-300 "
        onClick={handleOnClick}
      >
        {loading ? (
          <HashLoader
            color={"blue"}
            loading={loading}
            // cssOverride={override}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <div className="flex">
            <UserAddIcon className="h-4 w-4 text-blue-600" />
            <p className="text-blue-600 font-normal ">Add Friend</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Friend
