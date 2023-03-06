import { gql } from "@apollo/client"

export const GET_LIKE_BY_ADDRESS = gql`
  query PrimaryProfileEssences(
    $address: AddressEVM!
    $contentType: ContentType!
  ) {
    address(address: $address) {
      dislikes(contentType: $contentType) {
        totalCount
        edges {
          node {
            ... on Essence {
              name
              symbol
              tokenURI
            }
            ... on Comment {
              title
              body
            }
            ... on Post {
              title
              body
            }
          }
        }
      }
      likes(contentType: $contentType) {
        totalCount
        edges {
          node {
            contentID
            ... on Essence {
              name
            }
            ... on Comment {
              title
            }
            ... on Post {
              title
              body
            }
          }
        }
      }
    }
  }
`
