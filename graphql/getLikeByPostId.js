import { gql } from "@apollo/client"

export const GET_LIKE_BY_POST_ID = gql`
  query getPostByPostId($id: String!, $address: AddressEVM!) {
    content(id: $id) {
      contentID
      likedStatus(me: $address) {
        liked
        disliked
        proof {
          content
          digest
          signature
          signingKey
          signingKeyAuth {
            address
            message
            signature
          }
          arweaveTxHash
        }
      }
    }
  }
`
