import React from 'react';
import { View } from 'react-native';
import { Button, Heading } from '../../../shared';
import InputField from '../../../shared/buttons/InputField';
import { SvgSearch } from '../../../svgs';
import { height } from '../../../utils/constants';
import { AntDesign, Entypo, MaterialIcons } from '../../../utils/Icons';
import { COLORS } from '../../../utils/static';
import tw from '../../../utils/tailwind';

const AddSocialAccount = () => {
  return (
    <View style={tw`h-full bg-white`}>
      <View style={tw`p-5 h-${height - 76}px gap-y-6`}>
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
          },
          {
            label: 'Twitter',
            icon: <AntDesign name="twitter" size={28} />,
          },
          {
            label: 'Facebook',
            icon: <MaterialIcons name="facebook" size={28} />,
          },
        ].map(item => (
          <View
            style={tw`flex-row items-center justify-between bg-gray-50 rounded-lg py-3 px-4`}
          >
            <View style={tw`flex-row items-center gap-x-4`}>
              {item.icon}
              <Heading size="base" type="medium">
                {item.label}
              </Heading>
            </View>
            <Button
              btnName="Link Account"
              variant="link"
              styleBtnName="text-red-600 text-xs"
              className="mt-1"
            />
          </View>
        ))}
      </View>
      <Button btnName="Continue" className="mt-auto mb-4 mx-4" />
    </View>
  );
};

export default AddSocialAccount;
