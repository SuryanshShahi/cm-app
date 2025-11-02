import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import {
  Entypo
} from './Icons';
import tw from './tailwind';

export const COLORS = {
  gray50: '#F9FAFB',
  primary: '#fd5139',
  secondary: '#6B7280',
  red500: '#CC3535',
  gray100: '#DBDEE2',
  gray500: '#8B96A2',
  gray400: '#9CA3AF',
  brand: '#F47216',
};
export const UPPER_HEADER_HEIGHT = 260;
export const SMALL_UPPER_HEADER_HEIGHT = 200;
export const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={[
        tw.style(
          `border-l-green-500 bg-black items-center`,
          !props.text2 && 'h-10',
        ),
        props?.style,
      ]}
      renderLeadingIcon={() => (
        <Entypo
          name="info-with-circle"
          size={14}
          style={tw`ml-2 text-green-500`}
        />
      )}
      text1Style={[tw`font-bold text-white -ml-4`, props?.text1Style]}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={[
        tw.style(
          `border-l-red-500 bg-black items-center`,
          !props.text2 && 'h-10',
        ),
        props?.style,
      ]}
      renderLeadingIcon={() => (
        <Entypo
          name="info-with-circle"
          size={14}
          style={tw`ml-2 text-red-500`}
        />
      )}
      text1Style={[tw`font-bold text-white -ml-4`, props?.text1Style]}
    />
  ),
  info: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={[
        tw.style(
          `border-l-blue-500 bg-black items-center`,
          !props.text2 && 'h-10',
        ),
        props?.style,
      ]}
      renderLeadingIcon={() => (
        <Entypo
          name="info-with-circle"
          size={14}
          style={tw`ml-2 text-blue-500`}
        />
      )}
      text1Style={[tw`font-bold text-white -ml-4`, props?.text1Style]}
    />
  ),
  warning: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={[
        tw.style(
          `border-l-yellow-500 bg-black items-center`,
          !props.text2 && 'h-10',
        ),
        props?.style,
      ]}
      renderLeadingIcon={() => (
        <Entypo
          name="info-with-circle"
          size={14}
          style={tw`ml-2 text-yellow-500`}
        />
      )}
      text1Style={[tw`font-bold text-white -ml-4`, props?.text1Style]}
    />
  ),
};

export const ErrorMessage = {
  REQUIRED: 'This field is mandatory',
  NO_SPECIAL_CHARACTERS: 'Cannot have special characters',
  VALID_NUMBER: 'Please enter valid number',
};

export const Regex = {
  NAME: /^[a-zA-Z0-9 ]+$/,
  PHONE: /^[0-9]\d{9}$/,
  ONE_UPPERCASE: /(?=.*[A-Z])/,
  ONE_LOWERCASE: /(?=.*[a-z])/,
  ONE_NUMERIC: /(?=.*[0-9])/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
};

export const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export const imageFallBack =
  'https://aeria-public.s3.ap-south-1.amazonaws.com/images/avatar.png';
