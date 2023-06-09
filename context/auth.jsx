import detectEthereumProvider from "@metamask/detect-provider"
import { ExternalProvider, Web3Provider } from "@ethersproject/providers"
import { createContext, useContext, useEffect } from "react"
import { ethers } from "ethers"
import { useState } from "react"
import { CHAIN_ID } from "../constants"
import { useCancellableQuery } from "../hooks/useCancellabeQuery"
import { PRIMARY_PROFILE } from "../graphql/PrimaryProfile"
import { fetchFile, fetchMetadata, parseURL } from "../helpers/function"
import { GET_POST_BY_ADDRESS } from "../graphql/getPostByAddress"
import { GET_LIKE_BY_ADDRESS } from "../graphql/getLikeByAddress"
import { supabase } from "../lib/client"
import { PostContext } from "./post"
import { GET_SUBSCRIBER_BY_ADDRESS } from "../graphql"
import { async } from "@firebase/util"
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
  const [pProfiles, setPProfiles] = useState([])

  const [createPost, setCreatePost] = useState(false)
  const [arr, setArr] = useState([])
  const [allSub, setAllSub] = useState([])
  const [login, setLogin] = useState(false)

  useEffect(() => {
    if (!(provider && address)) return
    try {
      checkNetwork(provider)
    } catch (e) {
      alert(e.message)
    }
  }, [provider, address])

  const fetchProfile = async (profiles) => {
    profiles.forEach(async (el) => {
      try {
        let query
        let address = el.address
        query = useCancellableQuery({
          query: PRIMARY_PROFILE,
          variables: {
            address: address,
          },
        })
        const res = await query
        console.log(res)
        const data = res?.data?.address?.wallet?.primaryProfile
        setPProfiles((prev) => [...prev, data])
        // console.log(data)
      } catch (e) {
        alert(e.message)
      }
    })
  }

  const fetchSubscribers = async () => {
    let query
    try {
      query = useCancellableQuery({
        query: GET_SUBSCRIBER_BY_ADDRESS,
        variables: {
          address: address,
        },
      })
      const res = await query
      console.log(res)
      const data = res?.data?.address?.wallet?.subscribings?.edges
      console.log(data)

      let pArr = []
      data.forEach((el) => {
        pArr.push(el?.node?.profile?.id)
        setArr((prev) => [...prev, el?.node?.profile?.id])
        // console.log(arr)
      })
    } catch (e) {
      console.log(e.message)
    }
  }

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
        console.log(res)
        const primaryProfile = res?.data?.address?.wallet?.primaryProfile
        // console.log(primaryProfile)
        if (primaryProfile?.profileID) {
          setProfileHandle(primaryProfile.handle.replace(/.cyber\b/g, ""))
          const ipfsHash = primaryProfile?.metadata
          console.log(ipfsHash)
          if (arr.length >= 1) {
            pProfiles.forEach((el) => {
              if (!arr.includes(el.id)) {
                setAllSub((prev) => [...prev, el])
                // console.log(el)
              }
              //  console.log(subProfiles)
            })
          } else {
            pProfiles.forEach((el) => {
              setAllSub((prev) => [...prev, el])
            })
          }

          const profileAvatar = primaryProfile.body
            ? primaryProfile.body
            : "https://imgs.search.brave.com/6FnuC9ucTueo6fu1ZlwWDtqFhX62s8A5ngX8qMwB2Lk/rs:fit:600:600:1/g:ce/aHR0cHM6Ly9zdDMu/ZGVwb3NpdHBob3Rv/cy5jb20vOTk5ODQz/Mi8xMzMzNS92LzQ1/MC9kZXBvc2l0cGhv/dG9zXzEzMzM1MjA4/OC1zdG9jay1pbGx1/c3RyYXRpb24tZGVm/YXVsdC1wbGFjZWhv/bGRlci1wcm9maWxl/LWljb24uanBn"
          setProfileImage(profileAvatar)
        }
        console.log(primaryProfile)

        setPrimaryProfile(primaryProfile)
      } catch (e) {
        console.error(e)
      }
    }
    fetch()

    return () => {
      query.cancel()
    }
  }, [address, accessToken, arr, pProfiles])

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .upsert({
          cc_profile_id: primaryProfile?.profileID,
          address,
        })
        .eq("cc_profile_id", primaryProfile?.profileID)
      console.log(data)
      if (error) {
        throw error
      }

      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select()
      if (profilesError) {
        throw error
      }
      console.log(profiles)
      if (profiles) {
        await fetchProfile(profiles)
        await fetchSubscribers()
      }
    }

    fetch()
  }, [accessToken])

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

  /**Function to check network */
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
  // console.log(arr)
  useEffect(() => {
    // console.log(arr)
  }, [pProfiles])

  // console.log(allSub)
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
        profileHandle,
        profileImage,
        createContext,
        setCreatePost,
        createPost,
        setCreatePost,
        pProfiles,
        setPProfiles,
        login,
        setLogin,
        arr,
        allSub,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
