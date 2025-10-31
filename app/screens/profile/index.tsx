import React from 'react';
import Config from '../../../assets/Config';
import { Button, Heading, Img } from '../../shared';
import ScreenTemplate from '../../shared/ScreenTemplate';
import { View } from 'react-native';
import tw from '../../utils/tailwind';
import InputField from '../../shared/buttons/InputField';
import SelectDate from '../../shared/dateTime/SelectDate';

const Profile = () => {
  return (
    <ScreenTemplate className="gap-y-4">
      <View style={tw`flex-row items-center justify-between gap-x-4`}>
        <View style={tw`gap-x-4 flex-row items-center`}>
          <Img source={Config.logo} className="h-75px w-75px rounded-full" />
          <Heading size="lg" type="semibold">
            Suryansh
          </Heading>
        </View>
        <Button btnName="Edit" className="px-6" />
      </View>
      {[
        {
          label: 'Full Name',
          value: 'Suryansh Shahi',
          placeholder: '',
          type: '',
        },
        {
          label: 'DOB',
          value: '',
          placeholder: '',
          type: 'date',
        },
        {
          label: 'Gender',
          value: '',
          placeholder: '',
          type: '',
        },
        {
          label: 'Address',
          value: '',
          placeholder: '',
          type: '',
        },
        {
          label: 'City',
          value: '',
          placeholder: '',
          type: '',
        },
        {
          label: 'Working on Since',
          value: '',
          placeholder: '',
          type: 'date',
        },
        {
          label: 'Aadhar No',
          value: '',
          placeholder: '',
          type: '',
        },
      ].map(item => (
        <View style={tw`flex-row justify-between items-center`}>
          <Heading size="lg">{item.label}</Heading>
          {item.type === 'date' ? (
            <SelectDate
              close={() => {}}
              open={false}
              onSubmit={() => {}}
              className="w-[60%] -mt-4"
            />
          ) : (
            <InputField
              value={item.value}
              wrapperClassName="w-[60%]"
              className="text-sm"
            />
          )}
        </View>
      ))}
    </ScreenTemplate>
  );
};

export default Profile;
