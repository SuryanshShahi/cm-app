import React, { FC, PropsWithChildren } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Config from '../../../assets/Config';
import { Img, Heading } from '../../shared';
import tw from '../../utils/tailwind';
interface ILoginTemplate {
  className?: string;
}
const LoginTemplate: FC<PropsWithChildren<ILoginTemplate>> = ({
  children,
  className,
}) => {
  return (
    <View
      style={tw.style(
        `gap-y-4 items-center gap-y-8 px-5 py-10 bg-white h-full`,
        className,
      )}
    >
      <Img source={Config.logo} className="h-14 w-14" />
      <Heading size="3xl" type="medium">
        CM 360
      </Heading>
      {children}
      <Heading size="xs" color="secondary" className="mt-auto text-justify">
        To Verify with OTP , share your name, email address, language
        preference, and profile picture with CM 360. Before using this app, you
        can review CM 360 ’s
        <TouchableOpacity>
          <Heading size="xs" color="brand" type="semibold">
            privacy policy
          </Heading>
        </TouchableOpacity>{' '}
        and{' '}
        <TouchableOpacity>
          <Heading size="xs" color="brand" type="semibold">
            terms of service
          </Heading>
        </TouchableOpacity>
        .
      </Heading>
    </View>
  );
};

export default LoginTemplate;
