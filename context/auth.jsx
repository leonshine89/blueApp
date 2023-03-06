import detectEthereumProvider from "@metamask/detect-provider"
import { ExternalProvider, Web3Provider } from "@ethersproject/providers"
import { createContext, useEffect } from "react"
import { ethers } from "ethers"
import { useState } from "react"
import { CHAIN_ID } from "../constants"
import { useCancellableQuery } from "../hooks/useCancellabeQuery"
import { PRIMARY_PROFILE } from "../graphql/PrimaryProfile"
import { fetchFile, parseURL } from "../helpers/function"
import { GET_POST_BY_ADDRESS } from "../graphql/getPostByAddress"
// import pinataSDK from "@pinata/sdk";
export const AuthContext = createContext()

AuthContext.displayName = "AuthContext"

export const AuthContextProvider = ({ children }) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || ""
  const apiSecret = process.env.NEXT_PUBLIC_API_SECRET || ""
  // const pinata = pinataSDK(apiKey, apiSecret)
  /**State Variable to store the provider */
  const [provider, setProvider] = useState()

  /**State variable to store the address */
  const [address, setAddress] = useState(undefined)

  /**State variable to store the primary profile */
  const [primaryProfile, setPrimaryProfile] = useState(undefined)

  /**State variable to store the access token */
  const [accessToken, setAccessToken] = useState(undefined)

  /**State variable to store the initial number of accounts */
  const [profileCount, setProfileCount] = useState(0)

  /**State Variablt to store the initial number of badges */
  const [badgeCount, setBadgeCount] = useState(0)

  /**State variable to store the indexing profiles */
  const [indexingProfiles, setIndexingProfiles] = useState([])

  const [data, setData] = useState()

  const [profileHandle, setProfileHandle] = useState(undefined)
  const [profileImage, setProfileImage] = useState(undefined)

  const [createPost, setCreatePost] = useState(false)

  const [login, setLogin] = useState(false)

  useEffect(() => {
    if (!(provider && address)) return
    try {
      checkNetwork(provider)
    } catch (e) {
      alert(e.message)
    }
  }, [provider, address])

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //    const address = localStorage.getItem("address");
  //   setAccessToken(token)
  //   setAddress(address)

  // }, [])

  useEffect(() => {
    if (!(address && accessToken)) return
    let query
    const fetch = async () => {
      try {
        query = useCancellableQuery({
          query: PRIMARY_PROFILE,
          variables: {
            address: address,
          },
        })
        const res = await query
        const primaryProfile = res?.data?.address?.wallet?.primaryProfile
        if (primaryProfile?.profileID) {
          setProfileHandle(primaryProfile.handle.replace(/.cc\b/g, ""))

          const profileAvatar = primaryProfile.avatar
            ? primaryProfile.avatar
            : "https://imgs.search.brave.com/6FnuC9ucTueo6fu1ZlwWDtqFhX62s8A5ngX8qMwB2Lk/rs:fit:600:600:1/g:ce/aHR0cHM6Ly9zdDMu/ZGVwb3NpdHBob3Rv/cy5jb20vOTk5ODQz/Mi8xMzMzNS92LzQ1/MC9kZXBvc2l0cGhv/dG9zXzEzMzM1MjA4/OC1zdG9jay1pbGx1/c3RyYXRpb24tZGVm/YXVsdC1wbGFjZWhv/bGRlci1wcm9maWxl/LWljb24uanBn"
          setProfileImage(profileAvatar)
        }

        setPrimaryProfile(primaryProfile)
      } catch (e) {
        console.error(e)
      }
    }
    fetch()

    return () => {
      query.cancel()
    }
  }, [address, accessToken])

  useEffect(() => {
    console.log(primaryProfile?.metadata)
    if (!primaryProfile?.metadata) return

    ;(async () => {
      setData({
        name: "",
        bio: "",
      })
      try {
        const res = await fetch(parseURL(primaryProfile?.metadata))
        if (res.status === 200) {
          const data = await res.json()
          console.log(data)
          setData(data)
        }
      } catch (e) {
        window.alert(e.message)
      }
    })()
  }, [primaryProfile?.metadata])

  useEffect(() => {
    if (!primaryProfile?.metadata) return
    const ipfsHash = primaryProfile?.metadata
    ;async () => {
      console.log(fetchFile(ipfsHash))
    }
  }, [primaryProfile?.metadata])

  /**Function to connect with MetaMask Wallet */
  const connectWallet = async () => {
    try {
      /**Function to detect most providers injected at window.ethereum */
      const detectedProvider = await detectEthereumProvider()

      if (!detectedProvider) {
        throw new Error("Please install MetaMask!")
      }

      const web3Provider = new ethers.providers.Web3Provider(detectedProvider)

      await web3Provider.send("eth_requestAccounts", [])

      const signer = web3Provider.getSigner()

      const address = await signer.getAddress()

      localStorage.setItem("address", address)

      setProvider(web3Provider)
      setAddress(address)
      return web3Provider
    } catch (e) {
      throw error
    }
  }

  const checkNetwork = async (provider) => {
    try {
      const network = await provider.getNetwork()
      if (network.chainId !== CHAIN_ID) {
        await provider.send("wallet_switchEthereumChain", [
          {
            chainId: "0x" + CHAIN_ID.toString(16),
          },
        ])
        window.location.reload()
      }
    } catch (e) {
      if (e.code === 4902) {
        await provider.send("wallet_addEthereumChain", [
          {
            chainId: "0x" + CHAIN_ID.toString(16),
            rpcUrls: ["https://goerli.infura.io/v3/"],
          },
        ])
        window.location.reload()
      } else {
        throw error
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        provider,
        address,
        accessToken,
        primaryProfile,
        profileCount,
        badgeCount,
        indexingProfiles,
        setProvider,
        setAddress,
        setAccessToken,
        setPrimaryProfile,
        setBadgeCount,
        setIndexingProfiles,
        checkNetwork,
        connectWallet,
        login,
        setLogin,
        profileHandle,
        profileImage,
        createContext,
        setCreatePost,
        createPost,
        setCreatePost,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
