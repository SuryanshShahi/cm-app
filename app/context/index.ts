import { createContext } from 'react';
import { IGlobalContext } from './types';

export const GlobalContext = createContext<IGlobalContext>({
  data: null,
  setData: () => {},
});
