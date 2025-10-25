import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import EnterOtp from '../screens/auth/enterOtp';
import ScreenNames from '../utils/ScreenNames';
import LoginViaPhone from '../screens/auth/loginViaPhone';

const { Navigator, Screen } = createNativeStackNavigator();

export const LoginNavigator = () => {
  return (
    <Navigator
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <Screen name={ScreenNames.ENTER_OTP} component={EnterOtp} />
      <Screen name={ScreenNames.LOGIN_VIA_PHONE} component={LoginViaPhone} />
    </Navigator>
  );
};

export default LoginNavigator;
