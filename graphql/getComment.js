import { gql } from "@apollo/client"

export const GET_COMMENT = gql`
  query getCommentById($id: String!) {
    content(id: $id) {
      contentID
      ... on Comment {
        title
        body
        authorHandle
        authorAddress
        digest
        arweaveTxHash
        createdAt
        updatedAt
      }
    }
  }
`
