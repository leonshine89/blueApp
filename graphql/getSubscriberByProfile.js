import { gql } from "@apollo/client"

export const GET_SUBSCRIBER_BY_PROFILE = gql`
  query getSubscribersByProfile($address: AddressEVM!) {
    address(address: $address) {
      wallet {
        profiles(first: 1) {
          edges {
            node {
              id
              profileID
              isPrimary
              handle
              avatar
              owner {
                address
              }
              subscribers(first: 5) {
                totalCount
                edges {
                  node {
                    profile {
                      handle
                      avatar
                    }
                    wallet {
                      address
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
