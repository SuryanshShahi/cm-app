import {decode} from 'base-64';
import moment from 'moment';
import {Dimensions, Platform} from 'react-native';
import {hasNotch} from 'react-native-device-info';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import Toast, {ToastShowParams} from 'react-native-toast-message';

export const height = Dimensions.get('window').height;
export const width = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('screen').height;

export const build: 'staging' | 'prod' = 'staging';

export const buildConfig = {
  staging: {
    SERVICE_API_URL: 'https://vw552slb-8000.inc1.devtunnels.ms',
  },
  prod: {
    SERVICE_API_URL: 'https://vw552slb-8000.inc1.devtunnels.ms',
  },
};
export const showToast = (rest: ToastShowParams) => Toast.show(rest);

export const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    return hasNotch() ? 44 : 20;
  }
  return initialWindowMetrics?.insets.top || 0;
};

export const filterData = (data: any[] = [], input: string, key: string) => {
  const filteredData = data?.filter(elem => {
    if (input === '') {
      return elem;
    } else if (elem?.[key]?.toLowerCase().includes(input?.toLowerCase())) {
      return elem;
    }
  });
  return filteredData;
};

export const decodeToken = (token: string) => {
  try {
    return JSON.parse(decode(token?.split('.')[1]));
  } catch (e) {
    console.error('Failed to decode token:', e);
    return null;
  }
};

export const createUrl = (url: string, params?: object): string => {
  const queryString = params ? `?${stringifyParams(params)}` : '';
  return `${url}${queryString}`;
};
export const stringifyParams = (params: object) => {
  return Object.entries(params)
    ?.filter(([, value]) => Boolean(value))
    ?.map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`,
    )
    ?.join('&');
};

export const convertDate = (date: any) => {
  return moment(date).format('DD MMM YYYY');
};

export const convertTime = (time: any) => {
  return moment(time).utcOffset(330).format('hh:mm A');
};

export const find = (data: any, item: any, key?: string) =>
  data?.find((e: any) => (key ? e?.[key] : e) === item);
