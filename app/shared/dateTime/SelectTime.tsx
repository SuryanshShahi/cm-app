import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import {localizeKey} from '../../global';
import { COLORS } from '../../utils/static';
import tw from '../../utils/tailwind';

const SelectTime = ({
  label,
  time,
  open,
  onPress,
  close,
  onSelect,
  placeholder,
  required,
  children,
  inputLabel,
  initials,
  className,
  containerClassName,
}: {
  className?: string;
  label?: string;
  inputLabel?: string;
  time?: string;
  open: boolean;
  placeholder?: string;
  onPress?: () => void;
  onSelect: (e: any) => void;
  close: () => void;
  required?: boolean;
  children?: any;
  initials?: { hr: number; min: number };
  containerClassName?: string;
}) => {
  let date = new Date();
  date?.getMinutes() > 25 ? date.setMinutes(60) : date.setMinutes(30);

  return (
    <View style={tw.style(className)}>
      {children ? (
        children
      ) : (
        <View style={tw.style(`gap-y-2`, containerClassName)}>
          <Text style={tw`text-gray-400 text-xs leading-4`}>
            {inputLabel || label}
            {required && <Text style={tw`text-primary`}> *</Text>}
          </Text>
          <TouchableOpacity
            onPress={onPress}
            style={tw`flex-row w-full justify-between items-center`}
          >
            <Text style={tw`${time ? 'text-black' : 'text-secondary'}`}>
              {time || placeholder}
            </Text>
            <SimpleLineIcons name="clock" size={16} style={tw`text-gray-400`} />
          </TouchableOpacity>
        </View>
      )}
      <PaperProvider
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: COLORS.primary,
            surfaceVariant: COLORS.primary + '10',
            secondaryContainer: COLORS.primary + '10',
            onPrimaryContainer: COLORS.primary + '80',
            onSecondary: COLORS.primary,
            outline: COLORS.primary + '80',
            primaryContainer: COLORS.primary + '10',
            surface: 'white',
            onSurface: 'black',
            onPrimary: 'white',
            onSurfaceVariant: 'black',
          },
        }}
      >
        <TimePickerModal
          label={label}
          use24HourClock={false}
          visible={open}
          onDismiss={close}
          onConfirm={onSelect}
          hours={initials?.hr || date?.getHours()}
          minutes={initials?.min || date?.getMinutes()}
          animationType="slide"
          inputFontSize={40}
          cancelLabel={
            (
              <Text style={tw`text-black rounded-lg font-bold px-2 py-1`}>
                cancel
              </Text>
            ) as any
          }
          confirmLabel={
            (
              <Text style={tw`text-primary rounded-lg font-bold px-2 py-1`}>
                apply
              </Text>
            ) as any
          }
        />
      </PaperProvider>
    </View>
  );
};

export default SelectTime;

const customDarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    surfaceVariant: COLORS.primary + '10',
    secondaryContainer: COLORS.primary + '10',
    onPrimaryContainer: COLORS.primary + '80',
    onSecondary: COLORS.primary,
    outline: COLORS.primary + '80',
    primaryContainer: COLORS.primary + '10',
    surface: 'white',
    onSurface: 'black',
    onPrimary: 'white',
    onSurfaceVariant: 'black',
  },
};
