import { decode } from 'base-64';
import moment from 'moment';
import { Dimensions, PermissionsAndroid, Platform } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import { launchCamera } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import Toast, { ToastShowParams } from 'react-native-toast-message';

export const height = Dimensions.get('window').height;
export const width = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('screen').height;

export const build: 'staging' | 'prod' = 'staging';

export const buildConfig = { 
  staging: {
    SERVICE_API_URL: 'https://unrancoured-natashia-humourless.ngrok-free.dev',
  },
  prod: {
    SERVICE_API_URL: 'https://unrancoured-natashia-humourless.ngrok-free.dev',
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

export const requestCameraPermission = async () => {
  if (Platform.OS === 'ios') {
    // iOS permissions are handled automatically by the system
    return true;
  }
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App camera permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask me later',
        buttonNegative: 'Cancel',
        buttonPositive: 'Ok',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission given');
      return true;
    } else {
      console.log('Camera permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};
export const openCamera = async () => {
  const hasPermission = await requestCameraPermission();
  if (!hasPermission) {
    showToast({
      text1: 'Camera permission is required',
      type: 'error',
    });
    return;
  }
  const result = await launchCamera({
    cameraType: 'front',
    mediaType: 'photo',
  });

  // Handle user cancellation or errors
  if (result.didCancel) {
    return;
  }
  if (result.errorCode) {
    showToast({
      text1: result.errorMessage || 'Failed to open camera',
      type: 'error',
    });
    return;
  }

  const image = result?.assets?.[0];
  if (image) {
    try {
      const resizedImage = await ImageResizer.createResizedImage(
        image?.uri as string,
        800, // max width
        800, // max height
        'JPEG',
        60, // quality (0-100)
        0,
        undefined,
        false,
        {
          mode: 'cover',
          onlyScaleDown: true,
        },
      );

      return { ...resizedImage, type: result.assets?.[0]?.type };
    } catch (error) {
      console.error('Error resizing image', error);
      return;
    }
  }
};
