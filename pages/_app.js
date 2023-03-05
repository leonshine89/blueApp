import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { AppProps } from "next/app"
import { AuthContextProvider } from "../context/auth"
import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import { PostContextProvider } from "../context/post"

const client = new ApolloClient({
  uri: "https://api.cyberconnect.dev/testnet/",
  cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <PostContextProvider>
          <Component {...pageProps} />
        </PostContextProvider>
      </AuthContextProvider>
    </ApolloProvider>
  )
}

export default MyApp
