import React, { useState } from 'react';
import Config from '../../../assets/Config';
import { Button, Heading, Img } from '../../shared';
import ScreenTemplate from '../../shared/ScreenTemplate';
import { Text, View } from 'react-native';
import tw from '../../utils/tailwind';
import InputField from '../../shared/buttons/InputField';
import SelectDate from '../../shared/dateTime/SelectDate';
import { Dropdown } from 'react-native-element-dropdown';

const Profile = () => {
  const data = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
  ];
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ScreenTemplate
      className="gap-y-6"
      parentClassName="bg-white"
      styleBottomBar="border-transparent shadow-none"
      bottomBar={
        isActive && (
          <Button btnName="Save Changes" action={() => setIsActive(false)} />
        )
      }
    >
      <View style={tw`flex-row items-center justify-between gap-x-4`}>
        <View style={tw`gap-x-4 flex-row items-center`}>
          <Img source={Config.logo} className="h-75px w-75px rounded-full" />
          {!isActive && (
            <Heading size="lg" type="semibold">
              Suryansh
            </Heading>
          )}
        </View>
        <Button
          btnName={isActive ? 'Change Profile Pic' : 'Edit'}
          className={isActive ? '' : 'px-6'}
          action={() => setIsActive(!isActive)}
        />
      </View>
      <View style={tw`gap-y-4`}>
        {[
          {
            label: 'Full Name',
            value: 'Suryansh Shahi',
            placeholder: 'Enter full name',
            type: '',
          },
          {
            label: 'DOB',
            value: '',
            placeholder: 'DD/MM/YYYY',
            type: 'date',
          },
          {
            label: 'Gender',
            value: '',
            placeholder: 'Select your Gender',
            type: 'dropdown',
          },
          {
            label: 'Address',
            value: '',
            placeholder: 'Enter Address',
            type: 'textarea',
          },
          {
            label: 'City',
            value: '',
            placeholder: 'Enter City',
            type: '',
          },
          {
            label: 'Working on Since',
            value: '',
            placeholder: 'DD/MM/YYYY',
            type: 'date',
          },
          {
            label: 'Aadhar No',
            value: '',
            placeholder: 'Enter aadhaar number',
            type: '',
          },
        ].map(item => (
          <View
            style={tw.style(
              `justify-between`,
              isActive ? 'gap-y-1' : 'flex-row items-center',
            )}
          >
            <Heading size="base">
              {item.label}
              <Text style={tw`text-red-600`}>&nbsp;*</Text>
            </Heading>
            <View style={tw.style(isActive ? 'w-full' : 'w-[60%]')}>
              {item.type === 'date' ? (
                <SelectDate
                  close={() => setIsOpen(false)}
                  onPress={() => setIsOpen(true)}
                  open={isOpen}
                  onSubmit={() => setIsOpen(false)}
                  placeholder={item.placeholder}
                  disabled={!isActive}
                />
              ) : item.type === 'dropdown' ? (
                <Dropdown
                  style={tw.style(
                    `h-11 rounded-md border border-gray-300 px-3`,
                    !isActive && 'bg-gray-100',
                  )}
                  placeholderStyle={tw`text-sm text-secondary`}
                  selectedTextStyle={tw`text-sm`}
                  data={data}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={item.placeholder}
                  value={item.value}
                  onChange={item => {}}
                  disable={!isActive}
                />
              ) : (
                <InputField
                  value={item.value}
                  placeholder={item.placeholder}
                  className={`text-sm ${
                    item.type === 'textarea' ? 'h-20' : ''
                  }`}
                  disabled={!isActive}
                  numberOfLines={item.type === 'textarea' ? 4 : 1}
                />
              )}
            </View>
          </View>
        ))}
      </View>
    </ScreenTemplate>
  );
};

export default Profile;
