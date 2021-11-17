import gql from 'graphql-tag';
import { CharsCards } from '../types';
import api from './api';

export const getChars = async (page: number) => {
  return await api
    .query<CharsCards>({
      query: gql`
        query {
          characters(page: ${page}) {
            info {
              count
              pages
              next
              prev
            }
            results {
              name
              image
              origin {
                name
              }
              episode {
                episode
                name
              }
            }
          }
        }
      `,
    })
    .catch(() => null);
};

export const getCharsByName = async (name: string) => {
  return await api
    .query<CharsCards>({
      query: gql`
          query {
            characters(filter: {name: "${name}"}) {
              info {
                count
                pages
                next
                prev
              }
              results {
                name
                image
                origin {
                  name
                }
                episode {
                  episode
                  name
                }
              }
            }
          }
        `,
    })
    .catch(() => null);
};

export const getCharsByNameAndPage = async (name: string, page: number) => {
  return await api
    .query<CharsCards>({
      query: gql`
          query {
            characters(page: ${page}, filter: {name: "${name}"}) {
              info {
                count
                pages
                next
                prev
              }
              results {
                name
                image
                origin {
                  name
                }
                episode {
                  episode
                  name
                }
              }
            }
          }
        `,
    })
    .catch(() => null);
};
