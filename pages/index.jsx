import Head from "next/head"
import { useEffect, useRef, useState, useContext } from "react"
import Feed from "../components/Feed"
import Widgets from "../components/Widgets"

import { AuthContext } from "../context/auth"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Panel from "../components/Panel"
import CreatePost from "../components/CreatePost"
import { PostContext } from "../context/post"

export default function Home({}) {
  const { primaryProfile, accessToken, createPost, postParam } =
    useContext(AuthContext)
  const { post, setPost } = useContext(PostContext)
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

      <main className="flex w-screen justify-between">
        <Sidebar />
        <Feed />

        <Widgets />
      </main>

      {createPost ? <CreatePost /> : null}
    </div>
  )
}

export async function getServerSideProps(context) {
  // Get the user
  // const session = await getSession(context);s

  return {
    props: {
      // session
    },
  }
}
