import React, { useContext, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button, Heading } from '../../../shared';
import InputField from '../../../shared/buttons/InputField';
import SelectDate from '../../../shared/dateTime/SelectDate';
import { Feather, FontAwesome } from '../../../utils/Icons';
import tw from '../../../utils/tailwind';
import useHook from './useHook';
import ScreenTemplate from '../../../shared/ScreenTemplate';
import { GlobalContext } from '../../../context';

const Profile = () => {
  const { values, setFieldValue, handleBlur } = useHook();
  const inputs: {
    label: string;
    placeholder: string;
    type: 'text' | 'tel' | 'dropdown' | 'date';
    required: boolean;
  }[] = [
    {
      label: 'Full Name',
      placeholder: 'Enter Full Name',
      type: 'text',
      required: true,
    },
    {
      label: 'DOB',
      placeholder: 'Select Date',
      type: 'date',
      required: true,
    },
    {
      label: 'Phone',
      placeholder: 'Enter Phone Number',
      type: 'tel',
      required: true,
    },
    {
      label: 'Gender',
      placeholder: 'Select your Gender',
      type: 'dropdown',
      required: true,
    },
    {
      label: 'Address',
      placeholder: 'Enter your Full Address',
      type: 'text',
      required: true,
    },
    {
      label: 'District',
      placeholder: 'Enter your District',
      type: 'text',
      required: true,
    },
  ];
  const gender = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const { setData, data } = useContext(GlobalContext);
  return (
    <ScreenTemplate
      bottomBar={
        <Button
          btnName="Save"
          action={() => setData({ ...data, isLoggedIn: true })}
        />
      }
      className="gap-y-6"
      parentClassName="bg-white"
    >
      <View style={tw`items-center gap-y-2`}>
        <Heading size="xl" type="semibold">
          Step 2
        </Heading>
        <Heading size="base">Enter personal detail</Heading>
      </View>
      <View style={tw`items-center gap-y-2`}>
        <View
          style={tw`h-124px w-124px rounded-full bg-brand items-center justify-center`}
        >
          <FontAwesome name="user-o" size={64} color="white" />
          <View
            style={tw`bg-white h-6 w-6 rounded-full absolute bottom-2 right-1 border border-neutral-100`}
          >
            <Feather name="edit" style={tw`m-auto`} size={14} />
          </View>
        </View>
        <Heading
          size="base"
          type="medium"
          className="text-blue-500"
          onPress={() => {}}
        >
          Add Photo
        </Heading>
      </View>
      <View style={tw`gap-y-4`}>
        {inputs.map(item =>
          item.type === 'dropdown' ? (
            <View style={tw`gap-y-1`}>
              <Heading>
                {item.label}
                {item.required && <Text style={tw`text-red-500`}> *</Text>}
              </Heading>
              <Dropdown
                style={tw`h-11 rounded-md w-full border border-gray-300 px-3`}
                placeholderStyle={tw`text-sm text-secondary`}
                selectedTextStyle={tw`text-sm`}
                data={gender}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select your Gender"
                searchPlaceholder="Search..."
                value=""
                onChange={item => {}}
              />
            </View>
          ) : item.type === 'date' ? (
            <SelectDate
              {...item}
              date=""
              onPress={() => setIsOpen(true)}
              close={() => setIsOpen(false)}
              onSubmit={() => setIsOpen(false)}
              open={isOpen}
            />
          ) : (
            <InputField
              {...item}
              value={values?.phone}
              onChangeText={(e: string) => {
                setFieldValue('phone', e);
              }}
              onBlur={handleBlur('phone')}
              wrapperClassName="w-full"
            />
          ),
        )}
      </View>
    </ScreenTemplate>
  );
};

export default Profile;
