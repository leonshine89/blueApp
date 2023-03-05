import Head from "next/head";
import { useEffect, useRef, useState, useContext } from "react";
import Feed from "../components/Feed"
import Widgets from "../components/Widgets"

import { AuthContext } from "../context/auth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Panel from "../components/Panel";
import CreatePost from "../components/CreatePost";
import { PostContext } from "../context/post";

export default function Home({}) {
  const { primaryProfile, accessToken, createPost,postParam } = useContext(AuthContext);
  const {post, setPost} = useContext(PostContext)
  if (!primaryProfile?.profileID) return <Panel />

    

            // console.log(post);

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

      <Widgets />
    </main>





            {createPost ? <CreatePost /> : null}























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