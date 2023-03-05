import { gql } from "@apollo/client"

export const GET_POST_BY_ADDRESS = gql`
  query getPostByAddress($address: AddressEVM!) {
    address(address: $address) {
      wallet {
        primaryProfile {
          posts {
            edges {
              node {
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
          }
        }
      }
    }
  }
`
