import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Feather } from '../../utils/Icons';
import tw from '../../utils/tailwind';
import Button from '../buttons';
import Heading from '../Heading';
import ModalTemplate from './ModalTemplate';

const LogoutModal = ({
  close,
  isActive,
}: {
  close: () => void;
  isActive: boolean;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <ModalTemplate
      hideNotch
      showCross
      modalProps={{ isActive, close, modalClass: 'justify-center' }}
      containerClassName="gap-y-4 p-5 rounded-3xl bg-white"
      className="bg-transparent p-0"
    >
      <View style={tw`flex-row gap-x-4 items-center justify-center`}>
        <View style={tw`bg-red-50 h-10 w-10 rounded-full`}>
          <Feather name="log-out" size={18} style={tw`text-red-600 m-auto`} />
        </View>
        <Heading>Logout?</Heading>
      </View>
      <Text style={tw`text-base text-black text-center`}>
        Are you sure you want to logout?
      </Text>

      <View style={tw`flex-row items-center justify-between gap-x-4`}>
        <Button
          action={close}
          btnName="No"
          variant="outlined"
          className="w-full flex-1"
        />
        <Button
          action={() => {}}
          btnName="Yes"
          className="w-full flex-1 bg-red-600 border-red-600"
          isLoading={loading}
        />
      </View>
    </ModalTemplate>
  );
};

export default LogoutModal;
