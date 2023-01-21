import { gql } from "@apollo/client";

export const GET_ALL_CHARACTERS = gql(`
  query GetCharacters($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
        prev 
        next
        pages
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          id
          name
          type
          dimension
          residents {
            name
          }
          created
        }
        location {
          id
          name
          type
          dimension
          residents {
            name
          }
          created
        }
        image
        episode {
          id
          name
          air_date
          episode
          characters {
            name
          }
          created
        }
        created
      }
    }
  }`);
