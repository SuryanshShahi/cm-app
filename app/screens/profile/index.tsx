import React from 'react';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Config from '../../../assets/Config';
import { Button, Heading, Img } from '../../shared';
import InputField from '../../shared/buttons/InputField';
import SelectDate from '../../shared/dateTime/SelectDate';
import ScreenTemplate from '../../shared/ScreenTemplate';
import tw from '../../utils/tailwind';
import useHook from './useHook';
import { openCamera } from '../../utils/constants';

const Profile = () => {
  const gender = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
  ];
  const {
    userDetails,
    isActive,
    setIsActive,
    isOpen,
    setIsOpen,
    values,
    initialValues,
    setFieldValue,
    handleChange,
    handleBlur,
    errors,
    touched,
  } = useHook();
  type dates = 'dob' | 'workingSince';
  const inputFields: {
    label: string;
    value: string;
    placeholder: string;
    type: string;
    key?: keyof typeof initialValues;
  }[] = [
    {
      label: 'Full Name',
      value: values.name,
      placeholder: 'Enter Full Name',
      type: '',
      key: 'name',
    },
    {
      label: 'DOB',
      value: values.dob,
      placeholder: 'DD/MM/YYYY',
      type: 'date',
      key: 'dob',
    },
    {
      label: 'Gender',
      value: values.gender,
      placeholder: 'Select your Gender',
      type: 'dropdown',
      key: 'gender',
    },
    {
      label: 'Address',
      value: values.address,
      placeholder: 'Enter Address',
      type: 'textarea',
      key: 'address',
    },
    {
      label: 'City',
      value: values.city,
      placeholder: 'Enter City',
      type: '',
      key: 'city',
    },
    {
      label: 'Working on Since',
      value: values.workingSince,
      placeholder: 'DD/MM/YYYY',
      type: 'date',
      key: 'workingSince',
    },
    {
      label: 'Aadhar No',
      value: values.identifier as string,
      placeholder: 'Enter aadhaar number',
      type: '',
      key: 'identifier',
    },
  ];
  const takePicture = () => {
    openCamera()
      .then(res => {
        if (res) {
          setFieldValue('profileUrl', res);
        }
      })
      .catch(err => console.log(err));
  };
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
              {userDetails?.name}
            </Heading>
          )}
        </View>
        <Button
          btnName={isActive ? 'Change Profile Pic' : 'Edit'}
          className={isActive ? '' : 'px-6'}
          action={() => (isActive ? takePicture() : setIsActive(true))}
        />
      </View>
      <View style={tw`gap-y-4`}>
        {inputFields.map(item => {
          const fieldName = item.key as keyof typeof initialValues;
          return (
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
                    key={item.key}
                    close={() => setIsOpen('')}
                    onPress={() => setIsOpen(fieldName)}
                    open={isOpen === item.key}
                    date={values[item.key as dates]}
                    onSubmit={data => {
                      console.log({ asdd: item.key, data });
                      setFieldValue(fieldName, data.date);
                      setIsOpen('');
                    }}
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
                    data={gender}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={item.placeholder}
                    value={item.value}
                    onChange={data => {
                      setFieldValue(fieldName, data.value);
                    }}
                    disable={!isActive}
                  />
                ) : (
                  <InputField
                    value={item.value as string}
                    placeholder={item.placeholder}
                    onChangeText={handleChange(fieldName)}
                    onBlur={handleBlur(fieldName)}
                    className={`text-sm ${
                      item.type === 'textarea' ? 'h-20' : ''
                    }`}
                    disabled={!isActive}
                    numberOfLines={item.type === 'textarea' ? 4 : 1}
                    errorMessage={
                      errors[fieldName] && touched[fieldName]
                        ? errors[fieldName]
                        : ''
                    }
                  />
                )}
              </View>
            </View>
          );
        })}
      </View>
    </ScreenTemplate>
  );
};

export default Profile;
