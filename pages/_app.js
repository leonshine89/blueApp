import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { AppProps } from "next/app"
import { AuthContextProvider } from "../context/auth"
import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"

const client = new ApolloClient({
  uri: "https://api.cyberconnect.dev/testnet/",
  cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}

export default MyApp
