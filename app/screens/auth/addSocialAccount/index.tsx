import React from 'react';
import { View } from 'react-native';
import { Button, Heading, Loader } from '../../../shared';
import InputField from '../../../shared/buttons/InputField';
import ScreenTemplate from '../../../shared/ScreenTemplate';
import { SvgSearch } from '../../../svgs';
import {
  AntDesign,
  Entypo,
  MaterialIcons,
  Octicons,
} from '../../../utils/Icons';
import { COLORS } from '../../../utils/static';
import tw from '../../../utils/tailwind';
import useHook from './useHook';

const AddSocialAccount = () => {
  const {
    linkFacebook,
    linkInstagram,
    linkTwitter,
    isTwitterPending,
    isFacebookPending,
    isInstagramPending,
    socialAccounts,
    isSocialAccountsLoading,
    handleLogin,
  } = useHook();
  if (isSocialAccountsLoading) {
    return <Loader parentClass="h-full items-center justify-center bg-white" />;
  }

  return (
    <ScreenTemplate
      className="gap-y-6"
      parentClassName="bg-white"
      bottomBar={
        <Button
          btnName="Continue"
          action={handleLogin}
          disabled={!socialAccounts?.length}
        />
      }
    >
      <View style={tw`items-center gap-y-2`}>
        <Heading size="xl" type="semibold">
          Step 2
        </Heading>
        <Heading size="base">Enter personal detail</Heading>
      </View>
      <InputField
        placeholder="Search"
        primaryIcon={<SvgSearch stroke={COLORS.primary} style={tw`mt-2px`} />}
      />
      {[
        {
          label: 'Instagram',
          icon: <Entypo name="instagram" size={28} />,
          onPress: linkInstagram,
          isLoading: isInstagramPending,
          isLinked: socialAccounts?.some(
            account => account.platform === 'instagram',
          ),
        },
        {
          label: 'Twitter',
          icon: <AntDesign name="twitter" size={28} />,
          onPress: linkTwitter,
          isLoading: isTwitterPending,
          isLinked: socialAccounts?.some(
            account => account.platform === 'twitter',
          ),
        },
        {
          label: 'Facebook',
          icon: <MaterialIcons name="facebook" size={28} />,
          onPress: linkFacebook,
          isLoading: isFacebookPending,
          isLinked: socialAccounts?.some(
            account => account.platform === 'facebook',
          ),
        },
      ].map(item => (
        <View
          style={tw`flex-row items-center justify-between bg-gray-50 rounded-lg py-3 px-4`}
          key={item.label}
        >
          <View style={tw`flex-row items-center gap-x-4`}>
            {item.icon}
            <Heading size="base" type="medium">
              {item.label}
            </Heading>
          </View>
          <Button
            btnName={item.isLinked ? 'Linked' : 'Link Account'}
            variant="link"
            icon={
              item.isLinked && (
                <Octicons
                  name="check-circle"
                  size={14}
                  style={tw`text-green-600`}
                />
              )
            }
            styleBtnName={
              item.isLinked ? 'text-green-600 text-sm' : 'text-red-600 text-sm'
            }
            className="mt-1"
            isLoading={item.isLoading}
            action={item.onPress}
          />
        </View>
      ))}
    </ScreenTemplate>
  );
};

export default AddSocialAccount;
