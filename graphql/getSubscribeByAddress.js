import { gql } from "@apollo/client"

export const GET_SUBSCRIBER_BY_ADDRESS = gql`
  query getSubscribingByAddressEVM($address: AddressEVM!) {
    address(address: $address) {
      wallet {
        subscribings {
          totalCount
          edges {
            node {
              profile {
                id
                profileID
                handle
                owner {
                  address
                }
                avatar
                isPrimary
              }
            }
          }
        }
      }
    }
  }
`
