import { Backdrop, Container, Tab, Tabs, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoList from './components/InfoList';
import SearchBar from './components/SearchBar';
import { IState } from './redux/reducers';
import { getChars, getCharsByNameAndPage } from './services/chars';
import { getEps, getEpsByNameAndPage } from './services/eps';

const App: React.FC = () => {
  const { epsCards, charsCards, page, tab, loading, query } = useSelector(
    (state: IState) => state
  );
  const dispatcher = useDispatch();

  useEffect(() => {
    (async () => {
      dispatcher({ type: 'updateIsLoading', payload: true });

      if (tab == 0) {
        if (query) {
          const charsCards = (await getCharsByNameAndPage(query, page))?.data
            .characters;
          dispatcher({ type: 'updateCharsCards', payload: charsCards });
        } else {
          const charsCards = (await getChars(page))?.data.characters;
          dispatcher({ type: 'updateCharsCards', payload: charsCards });
        }
      } else {
        if (query) {
          const epsCards = (await getEpsByNameAndPage(query, page))?.data
            .episodes;
          dispatcher({ type: 'updateEpsCards', payload: epsCards });
        } else {
          const epsCards = (await getEps(page))?.data.episodes;
          dispatcher({ type: 'updateEpsCards', payload: epsCards });
        }
      }

      dispatcher({ type: 'updateIsLoading', payload: false });
    })();
  }, [page, tab]);

  return (
    <>
      {loading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          onClick={() => {}}
        >
          <img src='https://media2.giphy.com/media/e6tJpLvjY8jXa/giphy.gif?cid=790b76117c554a99bb3e285cb28e9b6835f1a342a6aba19c&rid=giphy.gif&ct=g' />
        </Backdrop>
      )}
      <Container
        maxWidth='lg'
        style={{
          backgroundColor: 'rgb(255,255,255,0.8)',
        }}
      >
        <Box
          sx={{
            height: 250,
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            padding: 1,
          }}
        >
          <Box>
            <img
              style={{
                paddingTop: 5,
                paddingRight: 20,
                width: 350,
              }}
              src='https://giffiles.alphacoders.com/118/118768.gif'
            />
          </Box>
          <Box>
            <Typography variant='h2' color='black'>
              Rick and Morty stats
            </Typography>
          </Box>
        </Box>
        <Container maxWidth='md'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <Tabs>
              <Tab
                onClick={() => {
                  dispatcher({ type: 'updateTab', payload: 0 });
                  dispatcher({ type: 'updatePage', payload: 1 });
                }}
                sx={{
                  backgroundColor: `${tab === 0 && '#B0E7E8'}`,
                  mx: 1,
                }}
                value={0}
                label='Personagens'
              />
              <Tab
                onClick={() => {
                  dispatcher({ type: 'updateTab', payload: 1 });
                  dispatcher({ type: 'updatePage', payload: 1 });
                }}
                sx={{
                  backgroundColor: `${tab === 1 && '#FFF874'}`,
                  mx: 1,
                }}
                value={1}
                label='Episódios'
              />
            </Tabs>
          </Box>
          <SearchBar />
          {tab == 0 && <InfoList cards={charsCards} />}
          {tab == 1 && <InfoList cards={epsCards} />}
        </Container>
      </Container>
    </>
  );
};

export default App;
