import { IRequestOtp, IVerifyOtp } from '../screens/auth/types';
import { MicroService } from '../utils/enums';
import { API_CONSTANTS } from './apiContants';
import axiosInstance from './axiosInstance';

// ----------------------------------------------------------------------------
// ------------------------------------ AUTH ----------------------------------
// ----------------------------------------------------------------------------

export const registerDevice = async (body: {identifier: string}) => {
  const res = await axiosInstance(MicroService.CORE).post(
    API_CONSTANTS.registerDevice,
    body,
  );
  return res?.data?.data;
};
export const requestOtp = async (body: IRequestOtp) => {
  const res = await axiosInstance(MicroService.CORE).post(
    API_CONSTANTS.requestOtp,
    body,
  );
  return res?.data?.data;
};

export const verifyOtp = async (body: IVerifyOtp) => {
  const res = await axiosInstance(MicroService.CORE).post(
    API_CONSTANTS.verifyOtp,
    body,
  );
  return res?.data?.data;
};

export const updateToken = async (body: {refreshToken: string}) => {
  const res = await axiosInstance(MicroService.CORE).post(
    API_CONSTANTS.updateToken,
    body,
  );
  return res?.data?.data;
};
// ------------------------------------------------------------------------------
// ------------------------------------  ----------------------------------
// ------------------------------------------------------------------------------
