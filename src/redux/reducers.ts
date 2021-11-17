import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { CharsCards, EpsCards } from '../types';

export interface IState {
  epsCards: EpsCards['episodes'];
  charsCards: CharsCards['characters'];
  page: number;
  tab: number;
  loading: boolean;
  query: string;
}

export const INITIAL_STATE: IState = {
  epsCards: {
    info: {
      count: undefined,
      next: undefined,
      pages: undefined,
      prev: undefined,
    },
    results: [],
  },
  charsCards: {
    info: {
      count: undefined,
      next: undefined,
      pages: undefined,
      prev: undefined,
    },
    results: [],
  },
  page: 1,
  tab: 0,
  loading: false,
  query: '',
};

const reducers = (
  state = INITIAL_STATE,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;

  switch (type) {
    case 'updateEpsCards':
      return { ...state, epsCards: payload };
    case 'updateCharsCards':
      return { ...state, charsCards: payload };
    case 'updatePage':
      return { ...state, page: payload };
    case 'updateTab':
      return { ...state, tab: payload };
    case 'updateIsLoading':
      return { ...state, loading: payload };
    case 'updateQuery':
      return { ...state, query: payload };
    default:
      return state;
  }
};

export default createStore(reducers, composeWithDevTools());
