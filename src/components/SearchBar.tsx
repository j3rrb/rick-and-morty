import {
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
} from '@material-ui/core';
import {
  ArrowDownward,
  ArrowUpward,
  Close,
  FilterList,
  SearchOutlined,
} from '@material-ui/icons';
import { Box, styled } from '@material-ui/system';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../redux/reducers';
import { getCharsByName } from '../services/chars';
import { getEpsByName } from '../services/eps';

const SearchBar: React.FC = () => {
  const { tab, charsCards, epsCards, query } = useSelector(
    (state: IState) => state
  );
  const [menu, setMenu] = useState<null | HTMLElement>(null);
  const { handleSubmit, setValue, register } = useForm();
  const dispatcher = useDispatch();
  const open = Boolean(menu);

  const orderByName = () => {
    if (tab === 0) {
      const cards = charsCards.results.slice();
      const cardsSorted = cards.sort(
        (a: { name: string }, b: { name: string }) => (a.name > b.name ? 1 : -1)
      );

      dispatcher({
        type: 'updateCharsCards',
        payload: { results: cardsSorted, info: charsCards.info },
      });

      setMenu(null);
    } else {
      const cards = epsCards.results.slice();
      const cardsSorted = cards.sort(
        (a: { name: string }, b: { name: string }) => (a.name > b.name ? 1 : -1)
      );

      dispatcher({
        type: 'updateEpsCards',
        payload: { results: cardsSorted, info: epsCards.info },
      });

      setMenu(null);
    }
  };

  const orderByDateAsc = () => {
    const cards = epsCards.results.slice();
    const cardsSorted = cards.sort(
      (a: { air_date: string }, b: { air_date: string }) =>
        new Date(a.air_date) > new Date(b.air_date) ? 1 : -1
    );

    dispatcher({
      type: 'updateEpsCards',
      payload: { results: cardsSorted, info: epsCards.info },
    });

    setMenu(null);
  };

  const orderByDateDesc = () => {
    const cards = epsCards.results.slice();
    const cardsSorted = cards.sort(
      (a: { air_date: string }, b: { air_date: string }) =>
        new Date(a.air_date) < new Date(b.air_date) ? 1 : -1
    );

    dispatcher({
      type: 'updateEpsCards',
      payload: { results: cardsSorted, info: epsCards.info },
    });

    setMenu(null);
  };

  const onSubmit = async (data: { query: string }) => {
    dispatcher({ type: 'updateQuery', payload: data.query });
    dispatcher({ type: 'updateIsLoading', payload: true });

    if (tab === 0) {
      const charsCards = (await getCharsByName(data.query))?.data.characters;
      dispatcher({
        type: 'updateCharsCards',
        payload: charsCards || {},
      });
    } else {
      const epsCards = (await getEpsByName(data.query))?.data.episodes;
      dispatcher({ type: 'updateEpsCards', payload: epsCards || {} });
    }

    dispatcher({ type: 'updatePage', payload: 1 });
    dispatcher({ type: 'updateIsLoading', payload: false });
  };

  const CustomTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display='flex' pt={2} px={3}>
        <CustomTextField
          {...register('query')}
          variant='outlined'
          color='primary'
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position='start'>
                <Box>
                  <IconButton title='Buscar' type='submit'>
                    <SearchOutlined />
                  </IconButton>
                  {query && (
                    <IconButton
                      title='Limpar'
                      type='submit'
                      onClick={() => {
                        dispatcher({ type: 'updateQuery', payload: '' });
                        setValue('query', '');
                      }}
                    >
                      <Close />
                    </IconButton>
                  )}
                </Box>
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: 'white',
            borderColor: 'black',
          }}
          placeholder={`Pesquise por um ${
            tab === 0 ? 'personagem' : 'episódio'
          }`}
          onChange={(e) => setValue('query', e.target.value)}
        />
        <Button
          sx={{
            ml: 1,
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid black',
          }}
          title='Ordernar por'
          onClick={(e) => setMenu(e.currentTarget)}
        >
          <FilterList />
        </Button>
        {menu && (
          <Menu anchorEl={menu} open={open} onClose={() => setMenu(null)}>
            <MenuItem onClick={() => orderByName()}>Nome</MenuItem>
            {tab === 1 && (
              <>
                <MenuItem onClick={() => orderByDateAsc()}>
                  Data <ArrowUpward />
                </MenuItem>
                <MenuItem onClick={() => orderByDateDesc()}>
                  Data <ArrowDownward />
                </MenuItem>
              </>
            )}
          </Menu>
        )}
      </Box>
    </form>
  );
};

export default SearchBar;
