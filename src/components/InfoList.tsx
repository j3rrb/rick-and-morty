import { List, Pagination, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import React from 'react';
import api from '../services/api';
import { ApolloProvider } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import InfoCard from './InfoCard';
import { IState } from '../redux/reducers';

const InfoList: React.FC<{ cards: any }> = ({ cards }) => {
  const { page, tab, loading } = useSelector((state: IState) => state);
  const dispatcher = useDispatch();

  return (
    <ApolloProvider client={api}>
      <Box>
        {Object.keys(cards).length ? (
          <>
            <List
              sx={{
                width: '100%',
                overflow: 'auto',
                maxHeight: 400,
                mt: 2,
              }}
            >
              {tab === 0 &&
                cards.results.map((char: any) => (
                  <InfoCard
                    name={char.name}
                    image={char.image}
                    description={[
                      {
                        label: 'Origem',
                        value: char.location.name,
                      },
                    ]}
                    details={[
                      {
                        label: 'Episódios',
                        value: char.episode,
                      },
                    ]}
                  />
                ))}
              {tab === 1 &&
                cards.results.map((ep: any) => {
                  return (
                    <InfoCard
                      name={ep.name}
                      description={[
                        {
                          label: 'Data de exibição',
                          value: ep.air_date,
                        },
                      ]}
                      details={[
                        {
                          label: 'Personagens',
                          value: ep.characters,
                        },
                      ]}
                    />
                  );
                })}
            </List>
            <Box display='flex' justifyContent='center'>
              <Pagination
                sx={{
                  m: 3,
                }}
                page={page}
                onChange={async (_, value) => {
                  dispatcher({ type: 'updatePage', payload: value });
                }}
                count={cards.info.pages}
              />
            </Box>
          </>
        ) : (
          !loading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 200,
                flexDirection: 'column',
              }}
            >
              <img
                width='200'
                height='100'
                src='https://media.comicbook.com/2021/07/rick-and-morty-season-5-episode-3-sad-1274553-1280x0.jpeg'
              />
              <Typography>Sem resultados</Typography>
            </Box>
          )
        )}
      </Box>
    </ApolloProvider>
  );
};

export default InfoList;
