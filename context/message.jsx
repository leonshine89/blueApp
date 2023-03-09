import React, { createContext } from "react"
import { Client } from "@xmtp/xmtp-js"
import { async } from "@firebase/util"

export const MessageContext = createContext()
messageContext.displayName = "messageContext"
export const MessageProvider = ({ children }) => {
  const { provider } = useContext(AuthContext)
  const sendMessage = async () => {
    const signer = provider.getSigner()
    const xmtp = await Client.create(signer)
    const conversations = xmtp.conversations
  }
  return (
    <MessageContext.Provider value={{}}>{children}</MessageContext.Provider>
  )
}

export default message
