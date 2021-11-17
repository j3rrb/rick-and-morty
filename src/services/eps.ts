import gql from 'graphql-tag';
import { EpsCards } from '../types';
import api from './api';

export const getEps = async (page: number) => {
  return await api
    .query<EpsCards>({
      query: gql`
        query {
          episodes(page: ${page}) {
            info {
              count
              pages
              next
              prev
            }
            results {
              name
              episode
              air_date
              characters {
                name
              }
            }
          }
        }
      `,
    })
    .catch(() => null);
};

export const getEpsByName = async (name: string) => {
  return await api
    .query<EpsCards>({
      query: gql`
        query {
            episodes(filter: {name: "${name}"}) {
                info {
                  count
                  pages
                  next
                  prev
                }
                results {
                  name
                  episode
                  air_date
                  characters {
                    name
                  }
                }
              }
        }
      `,
    })
    .catch(() => null);
};

export const getEpsByNameAndPage = async (name: string, page: number) => {
  return await api
    .query<EpsCards>({
      query: gql`
        query {
            episodes(page: ${page}, filter: {name: "${name}"}) {
                info {
                  count
                  pages
                  next
                  prev
                }
                results {
                  name
                  episode
                  air_date
                  characters {
                    name
                  }
                }
              }
        }
      `,
    })
    .catch(() => null);
};
