import { Contract, ethers } from "ethers"
import React, { useContext, useRef, useState } from "react"
import { PROFILE_NFT_ABI, PROFILE_NFT_ADDRESS } from "../../constants"
import { AuthContext } from "../../context/auth"
import { pinJSONToIPFS } from "../../helpers/function"
import { XIcon } from "@heroicons/react/outline"
import HashLoader from "react-spinners/HashLoader"

const CreateProfile = ({ createProfile, setCreateProfile }) => {
  const { indexingProfiles, setIndexingProfiles, connectWallet, checkNetwork } =
    useContext(AuthContext)
  const [handle, setHandle] = useState("")
  const [avatar, setAvatar] = useState("")
  const [name, setName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [bio, setBio] = useState("")
  const [imageToPost, setImageToPost] = useState("")
  const [operator, setOperator] = useState("")
  const [loading, setLoading] = useState(false)
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  }

  const filePickerRef = useRef("")

  const handleOnClick = async ({ handle, avatar, name, bio }) => {
    try {
      setLoading(true)
      const provider = await connectWallet()
      console.log(provider)

      await checkNetwork(provider)

      /**Construct metadata schema */
      const metadata = {
        name: name,
        bio: bio,
        handle: handle,
        version: "1.0.0",
      }
      /**Upload metadata to IPFS */
      const ipfsHash = await pinJSONToIPFS(metadata)

      const signer = provider.getSigner()

      const address = await signer.getAddress()

      const contract = new Contract(
        PROFILE_NFT_ADDRESS,
        PROFILE_NFT_ABI,
        signer
      )

      const tx = await contract.createProfile(
        /**CreateProfileParams */
        {
          to: address,
          handle: handle.toLowerCase(),
          metadata: "",
          avatar: "",
          operator: "0x85AAc6211aC91E92594C01F8c9557026797493AE",
        },
        0x0,
        0x0
      )

      await tx.wait()

      // const profileID = await contract.getProfileIdByHandle(handle)

      // await profileID.wait(1)

      window.location.reload()
    } catch (e) {
      const message = e.message
      console.log(message)
      setLoading(false)
    }
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result)
    }
  }

  const removeImage = () => {
    setImageToPost(null)
  }

  const param = {
    handle: name,
    avatar: imageToPost,
    name: firstName + lastName,
    bio: bio,
  }

  console.log(param)
  return (
    <div className="before absolute flex flex-col rounded-lg top-0 bottom-0 left-0 right-0 before justify-center items-center ">
      <div className="bg-white shadow-lg">
        <div className="border-b p-4 flex justify-between w-full">
          <div>
            <h1 className="text-3xl font-medium">Create Profile</h1>
            <p className="text-gray-400">It is quick and easy</p>
          </div>
          <XIcon
            className="h-7 cursor-pointer"
            onClick={() => setCreateProfile(false)}
          />
        </div>
        <div className="flex flex-col p-4">
          <div className="flex flex-col w-full h-full justify-around">
            <div className="flex overflow-hidden justify-between">
              <input
                type="text"
                value={firstName}
                className="formInput "
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
              />
              <input
                type="text"
                value={lastName}
                className="formInput"
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
              />
            </div>

            <input
              type="text"
              value={name}
              className="formInput w-full"
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
            />

            <div className="flex">
              <input
                type="file"
                value={avatar}
                className="cursor-pointer"
                ref={filePickerRef}
                onChange={addImageToPost}
                placeholder="profile Image"
              />

              {imageToPost && (
                <img
                  src={imageToPost}
                  height={50}
                  width={50}
                  className="rounded-full"
                />
              )}
            </div>
            <div>
              <label></label>
              <textarea
                type="text"
                className="formInput h-full mt-4 w-full"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="About You"
                cols={"30"}
                rows="10"
              />
            </div>
          </div>
          <div className="flex w-full justify-center">
            <button
              className={`mx-4 mb-5 p-2 bg-green-500 hover:bg-green-600 text-xl font-semibold rounded-md w-1/2 text-white cursor-pointer items-center flex justify-center `}
              onClick={() => handleOnClick(param)}
            >
              {loading ? (
                <HashLoader
                  color={"#fff"}
                  loading={loading}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Create Profile"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProfile
