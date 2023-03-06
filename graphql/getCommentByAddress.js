import { gql } from "@apollo/client"

export const GET_MESSAGE_BY_ADDRESS = gql`
  query PrimaryProfileEssences($address: AddressEVM!) {
    address(address: $address) {
      wallet {
        primaryProfile {
          commentCount
          comments {
            edges {
              node {
                contentID
                ... on Comment {
                  title
                  body
                  target {
                    ... on Comment {
                      title
                      body
                    }
                    ... on Essence {
                      name
                      symbol
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
        }
      }
    }
  }
`
