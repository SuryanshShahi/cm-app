import axios from 'axios';
import { IRequestOtp, IVerifyOtp } from '../screens/auth/types';
import { IUpdateProfile } from '../screens/profile/types';
import { API_CONSTANTS } from './apiContants';
import axiosInstance from './axiosInstance';
import RNBlobUtil from 'react-native-blob-util';

// ----------------------------------------------------------------------------
// ------------------------------------ AUTH ----------------------------------
// ----------------------------------------------------------------------------

export const registerDevice = async (body: {
  deviceId: string;
  fcmToken?: string;
  platform: string;
}) => {
  const res = await axiosInstance().post(API_CONSTANTS.registerDevice, body);
  return res?.data;
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
export const updateUserProfile = async (body: IUpdateProfile) => {
  const res = await axiosInstance().post(API_CONSTANTS.updateUserProfile, body);
  return res?.data?.data;
};
export const linkTwitterAccount = async (body: { cmId: string }) => {
  const res = await axiosInstance().post(
    API_CONSTANTS.linkTwitterAccount,
    body,
  );
  return res?.data?.data;
};
export const linkFacebookAccount = async (body: { cmId: string }) => {
  const res = await axiosInstance().post(
    API_CONSTANTS.linkFacebookAccount,
    body,
  );
  return res?.data?.data;
};
export const linkInstagramAccount = async (body: { cmId: string }) => {
  const res = await axiosInstance().post(
    API_CONSTANTS.linkInstagramAccount,
    body,
  );
  return res?.data?.data;
};
export const getSocialAccounts = async () => {
  const res = await axiosInstance().get(API_CONSTANTS.getSocialAccounts);
  return res?.data;
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
// ------------------------------------ FEEDBACK ----------------------------------
// ------------------------------------------------------------------------------
export const shareFeedback = async (body: {
  title: string;
  description: string;
}) => {
  const res = await axiosInstance().post(API_CONSTANTS.shareFeedback, body);
  return res?.data?.data;
};
// ------------------------------------------------------------------------------
// ------------------------------------ EVENTS ----------------------------------
// ------------------------------------------------------------------------------

export const getEvents = async (
  page: number,
  limit: number,
  status: string,
  search: string,
  startDate?: string,
  endDate?: string,
) => {
  const res = await axiosInstance().get(
    API_CONSTANTS.getEvents(page, limit, status, search, startDate, endDate),
  );
  return res?.data?.data;
};
export const getEventById = async (eventId: string) => {
  const res = await axiosInstance().get(API_CONSTANTS.getEventById(eventId));
  return res?.data?.data;
};
export const rsvpEvent = async (
  eventId: string,
  body: { isAttending: boolean },
) => {
  const res = await axiosInstance().post(
    API_CONSTANTS.rsvpEvent(eventId),
    body,
  );
  return res?.data?.data;
};

export const getNotifications = async () => {
  const res = await axiosInstance().get(API_CONSTANTS.getNotifications);
  return res?.data?.data;
};
// ------------------------------------------------------------------------------
// ------------------------------------ EVENTS ----------------------------------
// ------------------------------------------------------------------------------

export const getAnalytics = async () => {
  const res = await axiosInstance().get(API_CONSTANTS.getAnalytics);
  return res?.data?.data;
};

// ------------------------------------------------------------------------------
// ------------------------------------ COMMON ----------------------------------
// ------------------------------------------------------------------------------
export const uploadToS3 = async (
  filePath: string,
  uploadUrl: string,
  mimeType?: string,
) => {
  await RNBlobUtil.fetch(
    'PUT',
    uploadUrl,
    mimeType
      ? {
          'Content-Type': mimeType,
        }
      : {},
    RNBlobUtil.wrap(filePath),
  );
  return true;
};
