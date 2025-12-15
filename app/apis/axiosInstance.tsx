//  todo- please ignore all console logs in this file, required for debugging
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { updateToken } from '.';
import { build, buildConfig } from '../utils/constants';
import { MicroService } from '../utils/enums';
import { localstorageKeys } from '../utils/localstorageKeys';

const getBaseUrl = (name?: string) => {
  switch (name) {
    case MicroService.CORE:
      return buildConfig[build].SERVICE_API_URL;
    default:
      return buildConfig[build].SERVICE_API_URL;
  }
};

const getTokens = async () => {
  const tempTokenString = await AsyncStorage.getItem(
    localstorageKeys.TEMP_TOKEN,
  );
  const originalTokenString = await AsyncStorage.getItem(
    localstorageKeys.AUTH_TOKEN,
  );
  const tokenString = tempTokenString || originalTokenString;
  const token = tokenString ? JSON.parse(tokenString) : null;
  return {
    accessToken: token?.accessToken,
    refreshToken: token?.refreshToken,
  };
};
const axiosInstance = (serviceName?: string) => {
  const instance = axios.create({
    baseURL: getBaseUrl(serviceName),
  });
  // Request interceptor to add access token
  instance.interceptors.request.use(
    async config => {
      // NetworkUtil()
      const { accessToken } = await getTokens();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      // console.log(`🚀 api-req=> ${config.url}`, config);
      return config;
    },

    error => {
      return Promise.reject(error);
    },
  );

  // Response interceptor for handling token refresh
  instance.interceptors.response.use(
    response => {
      // console.log('🚀 api-res=> ~ response:', response.data);
      return response;
    },
    async error => {
      const originalRequest = error.config;

      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        const { refreshToken } = await getTokens();

        if (refreshToken) {
          try {
            // Make a request to refresh the access token
            const token = await updateToken({ refreshToken });
            const { accessToken } = token;
            // Save the new access token
            await AsyncStorage.setItem(
              localstorageKeys.AUTH_TOKEN,
              JSON.stringify(token),
            );

            // Update the original request with the new access token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            // Handle refresh token failure, e.g., redirect to login
            console.error('Refresh token failed:', refreshError);
            // Optionally, you could clear tokens and navigate to the login screen here
          }
        }
      }
      // console.log('🚀 api-res=> ~ axiosInstance ~ error:', error);
      return Promise.reject(error);
    },
  );
  return instance;
};

export default axiosInstance;
 