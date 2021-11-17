import { Backdrop, Container, Tab, Tabs, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoList from './components/InfoList';
import SearchBar from './components/SearchBar';
import { IState } from './redux/reducers';
import { getChars, getCharsByNameAndPage } from './services/chars';
import { getEps, getEpsByNameAndPage } from './services/eps';

const TabPanel: React.FC<{
  children?: React.ReactNode;
  index: number;
  value: number;
}> = (props) => {
  const { children, value, index, ...rest } = props;

  return (
    <div role='tabpanel' hidden={value !== index} {...rest}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const { epsCards, charsCards, page, tab, loading, query } = useSelector(
    (state: IState) => state
  );
  const dispatcher = useDispatch();

  useEffect(() => {
    (async () => {
      dispatcher({ type: 'updateIsLoading', payload: true });

      if (tab == 0) {
        const charsCards = (
          query
            ? await getCharsByNameAndPage(query, page)
            : await getChars(page)
        )?.data.characters;

        dispatcher({ type: 'updateCharsCards', payload: charsCards });
      } else {
        const epsCards = (
          query ? await getEpsByNameAndPage(query, page) : await getEps(page)
        )?.data.episodes;

        dispatcher({ type: 'updateEpsCards', payload: epsCards });
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
      <Box
        sx={{
          height: 350,
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
          p: 1,
          backgroundColor: 'black',
        }}
      >
        <Typography
          sx={{
            fontSize: '5vmax',
          }}
          color='white'
        >
          Rick and Morty stats & info
        </Typography>
      </Box>
      <Container
        maxWidth='xl'
        sx={{
          position: 'sticky',
          top: 0,
          width: '100%',
          left: 0,
          zIndex: 1000,
          backgroundColor: 'white',
        }}
      >
        <Box
          sx={{
            mt: 2,
          }}
        >
          <SearchBar />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
          }}
        >
          <Tabs
            value={tab}
            onChange={(_, newValue: number) => {
              if (newValue === 0) {
                dispatcher({ type: 'updateTab', payload: 0 });
              } else {
                dispatcher({ type: 'updateTab', payload: 1 });
              }

              dispatcher({ type: 'updatePage', payload: 1 });
            }}
          >
            <Tab color='white' value={0} label='Personagens' />
            <Tab value={1} label='Episódios' />
          </Tabs>
        </Box>
      </Container>
      <Container maxWidth='xl'>
        <TabPanel index={0} value={tab}>
          <InfoList cards={charsCards} />
        </TabPanel>
        <TabPanel index={1} value={tab}>
          <InfoList cards={epsCards} />
        </TabPanel>
      </Container>
    </>
  );
};

export default App;
