import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import EnterOtp from '../screens/auth/enterOtp';
import ScreenNames from '../utils/ScreenNames';
import LoginViaPhone from '../screens/auth/loginViaPhone';
import Profile from '../screens/auth/profile';
import AddSocialAccount from '../screens/auth/addSocialAccount';

const { Navigator, Screen } = createNativeStackNavigator();

export const LoginNavigator = () => {
  return (
    <Navigator
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <Screen name={ScreenNames.LOGIN_VIA_PHONE} component={LoginViaPhone} />
      <Screen name={ScreenNames.ENTER_OTP} component={EnterOtp} />
      <Screen name={ScreenNames.PROFILE} component={Profile} />
      <Screen
        name={ScreenNames.ADD_SOCIAL_ACCOUNT}
        component={AddSocialAccount}
      />
    </Navigator>
  );
};

export default LoginNavigator;
