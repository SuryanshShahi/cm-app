import {Dispatch, SetStateAction} from 'react';
import {ICustomerProfile} from '../screens/customer/types';

export interface IGlobalContext {
  data: {
    customerDetails: ICustomerProfile | null;
    [key: string]: any;
  } | null;
  setData: Dispatch<SetStateAction<{[key: string]: any} | null>>;
}
export interface IAuthContext {
  isLoggedIn: any;
  setIsLoggedIn: Dispatch<SetStateAction<any>>;
}
