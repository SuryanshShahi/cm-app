import moment from 'moment';
import React, { FC, PropsWithChildren } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { COLORS } from '../../utils/static';
import tw from '../../utils/tailwind';
import Heading from '../Heading';
import { Feather } from '../../utils/Icons';
interface ISelectDate {
  label?: string;
  placeholder?: string;
  date?: string;
  isMultipleDays?: boolean;
  range?: { startDate?: Date; endDate?: Date; date?: Date };
  open: boolean;
  close: () => void;
  onPress?: () => void;
  onSubmit: (e: { date: string }) => void;
  isValidRange?: boolean;
  required?: boolean;
  disabled?: boolean;
  containerClassName?: string;
  className?: string;
  errorMessage?: string;
}
const SelectDate: FC<PropsWithChildren<ISelectDate>> = ({
  isMultipleDays,
  onSubmit,
  open,
  close,
  range,
  children,
  isValidRange,
  label,
  required,
  onPress,
  date,
  placeholder,
  containerClassName,
  className,
  disabled,
  errorMessage,
}) => {
  return (
    <View style={tw.style(className)}>
      {children ? (
        children
      ) : (
        <View style={tw.style(`gap-y-2`, containerClassName)}>
          {label && (
            <Heading>
              {label}
              {required && <Text style={tw`text-red-500`}> *</Text>}
            </Heading>
          )}
          <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={tw.style(
              `h-11 rounded-md w-full border border-gray-300 px-3 flex-row justify-between items-center`,
              disabled && 'bg-gray-100',
              errorMessage && 'border-red-500',
            )}
          >
            <Text
              style={tw.style(
                date && !disabled ? 'text-black' : 'text-secondary',
              )}
            >
              {date || placeholder}
            </Text>
            <Feather name="calendar" size={18} style={tw`text-gray-400`} />
          </TouchableOpacity>
          {errorMessage && (
            <Text style={tw`text-xs text-red-500 -mt-1`}>{errorMessage}</Text>
          )}
        </View>
      )}
      <PaperProvider
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: COLORS.primary,
            primaryContainer: COLORS.primary + '10',
          },
        }}
      >
        <DatePickerModal
          presentationStyle="overFullScreen"
          locale="en"
          mode={isMultipleDays ? 'range' : 'single'}
          visible={open}
          onDismiss={close}
          startDate={range?.startDate || new Date()}
          endDate={range?.endDate}
          date={range?.date || new Date()}
          validRange={
            isValidRange
              ? {
                  startDate: moment().subtract(1, 'days').toDate(),
                  endDate: new Date(
                    new Date().setDate(new Date()?.getDate() + 90),
                  ),
                }
              : {}
          }
          label="Select Date"
          onConfirm={(params: any) => {
            if (isMultipleDays) {
              onSubmit({
                date: `${moment(params.startDate).format(
                  'YYYY-MM-DD',
                )} - ${moment(params.endDate).format('YYYY-MM-DD')}`,
              });
            } else {
              onSubmit({
                date: moment(params.date).format('YYYY-MM-DD'),
              });
            }
          }}
          saveLabel="Apply"
        />
      </PaperProvider>
    </View>
  );
};

export default SelectDate;

// const customDarkTheme = {
//   colors: {
//     primary: COLORS.primary,
//     primaryContainer: '#FFF7ED',
//     surface: 'white',
//     onSurface: 'black',
//     onPrimary: 'white',
//   },
// };
