import { gql } from "@apollo/client"

export const GET_POST = gql`
  query getPostByPostId($id: String!) {
    content(id: $id) {
      contentID
      ... on Post {
        title
        body
        authorHandle
        authorAddress
        digest
        arweaveTxHash
        createdAt
        updatedAt
        contentID
      }
    }
  }
`
