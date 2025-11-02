import { IRequestOtp, IVerifyOtp } from '../screens/auth/types';
import { API_CONSTANTS } from './apiContants';
import axiosInstance from './axiosInstance';

// ----------------------------------------------------------------------------
// ------------------------------------ AUTH ----------------------------------
// ----------------------------------------------------------------------------

export const registerDevice = async (body: { identifier: string }) => {
  const res = await axiosInstance().post(API_CONSTANTS.registerDevice, body);
  return res?.data?.data;
};

export const requestOtp = async (body: IRequestOtp) => {
  const res = await axiosInstance().post(API_CONSTANTS.requestOtp, body);
  return res?.data;
};

export const verifyOtp = async (body: IVerifyOtp) => {
  const res = await axiosInstance().post(API_CONSTANTS.verifyOtp, body);
  return res?.data;
};

export const updateToken = async (body: { refreshToken: string }) => {
  const res = await axiosInstance().post(API_CONSTANTS.updateToken, body);
  return res?.data?.data;
};

export const getUserProfile = async () => {
  const res = await axiosInstance().get(API_CONSTANTS.getUserProfile);
  return res?.data?.data;
};
// ------------------------------------------------------------------------------
// ------------------------------------ POSTS -----------------------------------
// ------------------------------------------------------------------------------

export const getPosts = async () => {
  const res = await axiosInstance().get(API_CONSTANTS.getPosts);
  return res?.data?.data;
};
export const interactionLike = async (body: { postId: string }) => {
  const res = await axiosInstance().post(API_CONSTANTS.interactionLike, body);
  return res;
};
export const interactionComment = async (body: { postId: string }) => {
  const res = await axiosInstance().post(
    API_CONSTANTS.interactionComment,
    body,
  );
  return res?.data?.data;
};
export const interactionShare = async (body: { postId: string }) => {
  const res = await axiosInstance().post(API_CONSTANTS.interactionShare, body);
  return res?.data?.data;
};

// ------------------------------------------------------------------------------
// ------------------------------------ EVENTS ----------------------------------
// ------------------------------------------------------------------------------

export const getEvents = async () => {
  const res = await axiosInstance().get(API_CONSTANTS.getEvents);
  return res?.data?.data;
};
export const getEventById = async (eventId: string) => {
  const res = await axiosInstance().get(API_CONSTANTS.getEventById(eventId));
  return res?.data?.data;
};
// ------------------------------------------------------------------------------
// ------------------------------------ EVENTS ----------------------------------
// ------------------------------------------------------------------------------

export const getAnalytics = async () => {
  const res = await axiosInstance().get(API_CONSTANTS.getAnalytics);
  return res?.data?.data;
};
