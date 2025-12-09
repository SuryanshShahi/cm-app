import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { GlobalContext } from '../../../context';
import { Button, Heading } from '../../../shared';
import InputField from '../../../shared/buttons/InputField';
import SelectDate from '../../../shared/dateTime/SelectDate';
import ScreenTemplate from '../../../shared/ScreenTemplate';
import { Feather, FontAwesome } from '../../../utils/Icons';
import tw from '../../../utils/tailwind';
import useHook from './useHook';

const Profile = ({ navigation }: any) => {
  const {
    values,
    setFieldValue,
    handleBlur,
    initialValues,
    errors,
    touched,
    handleSubmit,
    isPending,
  } = useHook();
  const inputs: {
    label: string;
    placeholder: string;
    type: 'text' | 'tel' | 'dropdown' | 'date';
    required: boolean;
    value: string;
    key: string;
  }[] = [
    {
      label: 'Full Name',
      placeholder: 'Enter Full Name',
      type: 'text',
      required: true,
      value: values.name,
      key: 'name',
    },
    {
      label: 'DOB',
      placeholder: 'Select Date',
      type: 'date',
      required: false,
      key: 'dob',
      value: values.dob,
    },
    {
      label: 'Phone',
      placeholder: 'Enter Phone Number',
      type: 'tel',
      required: false,
      key: 'phone',
      value: values.phone,
    },
    {
      label: 'Gender',
      placeholder: 'Select your Gender',
      type: 'dropdown',
      required: false,
      key: 'gender',
      value: values.gender,
    },
    {
      label: 'Address',
      placeholder: 'Enter your Full Address',
      type: 'text',
      required: false,
      key: 'address',
      value: values.address,
    },
    {
      label: 'District',
      placeholder: 'Enter your District',
      type: 'text',
      required: false,
      key: 'district',
      value: values.district,
    },
  ];
  const gender = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
  ];
  const [isOpen, setIsOpen] = useState<string>('');
  return (
    <ScreenTemplate
      bottomBar={
        <Button
          btnName="Save"
          action={handleSubmit}
          isLoading={isPending}
          disabled={!values.name}
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
        {inputs.map(item => {
          const fieldName = item.key as keyof typeof initialValues;
          const errorMessage =
            errors[fieldName] && touched[fieldName] ? errors[fieldName] : '';
          return (
            <View style={tw``}>
              <Heading size="base">
                {item.label}
                {item.required && <Text style={tw`text-red-600`}>&nbsp;*</Text>}
              </Heading>
              <View style={tw.style('w-full')}>
                {item.type === 'date' ? (
                  <SelectDate
                    key={item.key}
                    close={() => setIsOpen('')}
                    onPress={() => setIsOpen(fieldName)}
                    open={isOpen === item.key}
                    date={item.value as string}
                    onSubmit={data => {
                      setFieldValue(fieldName, data.date);
                      setIsOpen('');
                    }}
                    placeholder={item.placeholder}
                    errorMessage={errorMessage as string}
                  />
                ) : item.type === 'dropdown' ? (
                  <View style={tw`gap-y-1`}>
                    <Dropdown
                      style={tw.style(
                        `h-11 rounded-md px-3 border border-gray-300`,
                        errorMessage && 'border-red-500',
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
                    />
                    {errorMessage && (
                      <Text style={tw`text-xs text-red-500`}>
                        {errorMessage as string}
                      </Text>
                    )}
                  </View>
                ) : (
                  <InputField
                    value={item.value as string}
                    placeholder={item.placeholder}
                    onChangeText={e => setFieldValue(fieldName, e as string)}
                    onBlur={handleBlur(fieldName)}
                    className={`text-sm`}
                    errorMessage={errorMessage as string}
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
