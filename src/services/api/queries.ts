import { gql } from "@apollo/client";

type Filter = {
  page?: number;
  name?: string;
};

export const GET_ALL_CHARACTERS = (page?: number) => gql`
  query {
    characters${page ? `(page: ${page})` : ""} {
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
  }
`;
