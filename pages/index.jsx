import Head from "next/head";
import Web3Modal from "web3modal";
import { Contract, providers } from "ethers";
import { useEffect, useRef, useState, useContext } from "react";
import { IPF_HASH, PROFILE_NFT_ABI, PROFILE_NFT_ADDRESS } from "../constants";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  gql,
  useMutation,
} from "@apollo/client";
import Panel from "../components/Panel";
import { AuthContext } from "../context/auth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Login from "../components/Login";
import {useSession, signIn, signOut} from "next-auth/react"
import Feed from "../components/Feed";

export default function Home({}) {
  const {data: session} = useSession();
  if (!session) return <Login />;
  const { primaryProfile } = useContext(AuthContext);

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId != 97) {
      window.alert("Please switch to Smart network");
      throw new Error();
    }
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const connectWallet = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const account = await signer.getAddress();
      console.log(account);
      const messageResult = await loginGetMessage({
        variables: {
          input: {
            address: account,
            domain: "xxxxxxx.xxx",
          },
        },
      });
      const message = messageResult?.data?.loginGetMessage?.message;
      console.log(message);

      // get the signature for the message signed with the wallet
      const signature = await signer.signMessage(message);

      // verify the signature on the server and get the access token
      const accessTokenResult = await loginVerify({
        variables: {
          input: {
            address: account,
            domain: "xxxxxxx.xxx",
            signature: signature,
          },
        },
      });

      const accessToken = accessTokenResult?.data?.loginVerify?.accessToken;

      console.log("~~ Access Token ~~");
      console.log(accessToken);

      /**Save the access token in local storage */
      localStorage.setItem("accessToken", accessToken);

      setAccessToken(accessToken);
      setWallectConnected(true);
    } catch (e) {
      console.error(e);
    }
  };



  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>FaceBook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/**Header */}
      <Header />

    <main className="flex">
      <Sidebar />
      <Feed />
    </main>




























      {/* <main>
        <h1>Meta World</h1>
        {!primaryProfile?.profileID ? (
          <Panel />
        ) : (
          <div>
            <h1>Welcome To MetaBook</h1>

            <div>
              <img
                src={primaryProfile.avatar}
                height={40}
                style={{
                  borderRadius: "50%",
                  border: "black",
                  borderWidth: "5px",
                }}
              />
              <h3>ProfileName: {primaryProfile.handle}</h3>
            </div>
          </div>
        )}
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  // Get the user
  // const session = await getSession(context);s

  return {
    props: {
      // session
    }
  }
}