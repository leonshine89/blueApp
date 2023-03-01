import detectEthereumProvider from "@metamask/detect-provider";
import { ExternalProvider, Web3Provider } from "@ethersproject/providers";
import { createContext, useEffect } from "react";
import { ethers } from "ethers";
import { useState } from "react";
import { CHAIN_ID } from "../constants";
import { useCancellableQuery } from "../hooks/useCancellabeQuery";
import { PRIMARY_PROFILE } from "../graphql/PrimaryProfile";

export const AuthContext = createContext();

AuthContext.displayName = "AuthContext"

export const AuthContextProvider = ({ children }) => {
  /**State Variable to store the provider */
  const [provider, setProvider] = useState();

  /**State variable to store the address */
  const [address, setAddress] = useState(undefined);

  /**State variable to store the primary profile */
  const [primaryProfile, setPrimaryProfile] = useState(undefined);

  /**State variable to store the access token */
  const [accessToken, setAccessToken] = useState(undefined);

  /**State variable to store the initial number of accounts */
  const [profileCount, setProfileCount] = useState(0);

  /**State Variablt to store the initial number of badges */
  const [badgeCount, setBadgeCount] = useState(0);

  /**State variable to store the indexing profiles */
  const [indexingProfiles, setIndexingProfiles] = useState([]);

  const [login, setLogin] = useState(false)

  useEffect(() => {
    if (!(provider && address)) return;
    try {
      checkNetwork(provider);
    } catch (e) {
      alert(e.message)
    }
  }, [provider, address])

  useEffect(() => {
    if (!(address && accessToken)) return;
    let query;

    const fetch = async () => {
      try {
        query = useCancellableQuery({
          query: PRIMARY_PROFILE,
          variables: {
            address: address,
          }
        });
        const res = await query;
        const primaryProfile = res?.data?.address?.wallet?.primaryProfile;
        console.log(primaryProfile);

        setPrimaryProfile(primaryProfile);
      } catch (e) {
        console.error(e);
      }
    };
    fetch();

    return () => {
      query.cancel();
    }
  }, [address, accessToken]);

  
  
  
  /**Function to connect with MetaMask Wallet */
  const connectWallet = async () => {
    try {
        /**Function to detect most providers injected at window.ethereum */
        const detectedProvider =
				(await detectEthereumProvider()) 

        if (!detectedProvider) {
            throw new Error("Please install MetaMask!");
        }

        const web3Provider = new ethers.providers.Web3Provider(detectedProvider)

        await web3Provider.send("eth_requestAccounts", []);

        const signer = web3Provider.getSigner();

        const address = await signer.getAddress();

        setProvider(web3Provider);
        setAddress(address);
        return web3Provider;
    } catch (e) {
        throw error;
    }
  }

  const checkNetwork =async (provider) => {
    try {
      const network = await provider.getNetwork();
      if (network.chainId !== CHAIN_ID) {
        await provider.send("wallet_switchEthereumChain", [{
          chainId: "0x" + CHAIN_ID.toString(16)
        },]);
        window.location.reload();
      }
    } catch (e) {
      if (e.code === 4902) {
        await provider.send("wallet_addEthereumChain", [
          {
            chainId: "0x" + CHAIN_ID.toString(16),
            rpcUrls: ["https://goerli.infura.io/v3/"],
          },
        ]);
        window.location.reload();
      } else { 
        throw error;
      }
    }
  }

  return (
    <AuthContext.Provider value={{provider,
    address, accessToken, primaryProfile, profileCount, badgeCount, indexingProfiles, setProvider, setAddress, setAccessToken, setPrimaryProfile, setBadgeCount, setIndexingProfiles, checkNetwork, connectWallet, login, setLogin}}>
      {children}

    </AuthContext.Provider>
  )
};
