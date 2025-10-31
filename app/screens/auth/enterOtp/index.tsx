import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import Button from '../../../shared/buttons';
import Heading from '../../../shared/Heading';
import { localstorageKeys } from '../../../utils/localstorageKeys';
import tw from '../../../utils/tailwind';
import useHook from './useHook';
import LoginTemplate from '../LoginTemplate';
import ScreenNames from '../../../utils/ScreenNames';

const EnterOtp = ({ navigation, route }: any) => {
  const { setOtp, error, count, isPending, resendOtp } = useHook(
    navigation,
    route,
  );
  const handleSubmit = async () => {
    const registeredDeviceId = await AsyncStorage.getItem(
      localstorageKeys.REGISTERED_DEVICE_ID,
    );
    navigation.navigate(ScreenNames.PROFILE);
    // resendOtp({
    //   mode: 'phone',
    //   identifier: route?.params?.phone,
    //   registeredDeviceId: registeredDeviceId ?? '',
    //   type: 'customer',
    // });
  };
  return (
    <LoginTemplate>
      <View style={tw`gap-y-2 self-start`}>
        <Heading size="xl">6 - Digit OTP </Heading>
        <Heading size="xs" type="medium">
          Enter Security Code sent to +91-9443528951 / user360@gmail.com unless
          you have account{' '}
        </Heading>
      </View>
      <View style={tw`w-full gap-y-4 items-center`}>
        <OtpInput
          numberOfDigits={6}
          focusColor={tw.color('primary')}
          autoFocus={false}
          blurOnFilled={true}
          disabled={false}
          type="numeric"
          secureTextEntry={false}
          focusStickBlinkingDuration={500}
          onTextChange={(e: string) => setOtp(e)}
          theme={{
            pinCodeTextStyle: tw`text-black`,
            filledPinCodeContainerStyle: tw`border border-primary`,
          }}
          textInputProps={{
            accessibilityLabel: 'One-Time Password',
          }}
        />
        <Text style={tw`text-red-500 font-medium`}>{error}</Text>
        <View style={tw`flex-row items-center gap-x-1`}>
          <Text style={tw`font-medium text-secondary`}>
            Did not receive OTP yet?
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (count === 0) {
                handleSubmit();
              }
            }}
          >
            <Text
              style={tw.style(`font-bold text-secondary`, {
                'text-brand': count === 0,
              })}
            >
              Resend again
            </Text>
          </TouchableOpacity>
          {count !== 0 && (
            <Text style={tw`text-secondary font-medium`}>
              ({'in' + ' ' + count + ' ' + 'sec'})
            </Text>
          )}
        </View>
      </View>
      <Button
        action={handleSubmit}
        btnName="Continue"
        isLoading={isPending}
        className="w-full"
      />
    </LoginTemplate>
  );
};

export default EnterOtp;
