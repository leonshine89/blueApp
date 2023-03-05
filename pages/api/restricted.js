import { getServerSession } from "next-auth/next"
import { db } from "../../firebase"
import { authOptions } from "./auth/[...nextauth]"

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions)

  const posts = await db.collect("posts").orderBy("timestamp", "desc").get()

  const docs = posts.docs.mao((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null,
  }))

  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    })
  } else {
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    })
  }
}
