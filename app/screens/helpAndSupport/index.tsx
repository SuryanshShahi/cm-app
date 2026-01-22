import React from 'react';
import ScreenTemplate from '../../shared/ScreenTemplate';
import { Heading } from '../../shared';
import { Linking, View } from 'react-native';
import tw from '../../utils/tailwind';
import Button from '../../shared/buttons';

const HelpAndSupport = () => {
  return (
    <ScreenTemplate
      className="gap-y-4"
      styleBottomBar="bg-transparent shadow-none mb-4"
      bottomBar={
        <View style={tw.style('gap-x-4 flex-row justify-between')}>
          <Button
            btnName="Contact Us"
            className="bg-brand/10 flex-1"
            styleBtnName="text-brand"
            action={() => {}}
          />
          <Button
            btnName="Email Us"
            className="bg-brand/10 flex-1"
            styleBtnName="text-brand"
            action={() => {}}
          />
        </View>
      }
    >
      <View style={tw.style('items-center')}>
        <Heading size="xl">Need Help ?</Heading>
        <Heading size="xl">We’re here for you</Heading>
      </View>
      <View style={tw.style('gap-y-4 max-w-[300px] mx-auto mt-4')}>
        <Heading onPress={() => Linking.openURL('tel:(555) 123-4567')}>
          Feel free to contact us at : (555) 123-4567.
        </Heading>
        <Heading onPress={() => Linking.openURL('mailto:cm3360@gmail.com')}>
          you can reach us via : cm3360@gmail.com.
        </Heading>
        <Heading
          className="self-center text-center max-w-[250px] mx-auto leading-6"
          color="tertiary"
        >
          We're available from Monday to Sunday, 9 AM to 6 PM.
        </Heading>
      </View>
    </ScreenTemplate>
  );
};

export default HelpAndSupport;
