import React from 'react';
import { Button, Heading } from '../../../shared';
import { View } from 'react-native';
import tw from '../../../utils/tailwind';
import LoginTemplate from '../LoginTemplate';
import ScreenNames from '../../../utils/ScreenNames';

const SelectedMode = ({ navigation }: any) => {
  return (
    <LoginTemplate>
      <Heading size="xl">Welcome to CM 360 login</Heading>
      <View style={tw`w-full gap-y-4`}>
        <Button
          btnName="Login via Phone"
          variant="outlined"
          className="border-tertiary"
          action={() =>
            navigation.navigate(ScreenNames.LOGIN, { mode: 'phone' })
          }
        />
        <Button
          btnName="Login via Email"
          variant="outlined"
          className="border-tertiary"
          action={() =>
            navigation.navigate(ScreenNames.LOGIN, { mode: 'email' })
          }
        />
      </View>
    </LoginTemplate>
  );
};

export default SelectedMode;
