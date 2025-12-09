import { Dispatch, SetStateAction } from 'react';

export interface IGlobalContext {
  data: {
    userDetails: IUserDetails | null;
    isLoggedIn: boolean;
    [key: string]: any;
  } | null;
  setData: Dispatch<SetStateAction<{ [key: string]: any } | null>>;
}
export interface IAuthContext {
  isLoggedIn: any;
  setIsLoggedIn: Dispatch<SetStateAction<any>>;
}

export interface IUserDetails {
  dob: string;
  gender: string;
  userId: string;
  cmId: string;
  email: string;
  name: string;
  phone: string;
  photoUrl: string;
  aadhaarNumber: string;
  workingWithPartySince: string;
  aadharDocId: string | null;
  photoId: string | null;
  address: string;
  joiningDate: string;
  city: string;
  district: string;
  constituency: string;
  roleId: string;
  createdAt: string;
  updatedAt: string;
}
