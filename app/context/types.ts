import { Dispatch, SetStateAction } from 'react';

export interface IGlobalContext {
  data: {
    userDetails: any | null;
    isLoggedIn: boolean;
    [key: string]: any;
  } | null;
  setData: Dispatch<SetStateAction<{ [key: string]: any } | null>>;
}
export interface IAuthContext {
  isLoggedIn: any;
  setIsLoggedIn: Dispatch<SetStateAction<any>>;
}
