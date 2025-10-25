import React, { FC, ReactNode } from 'react';
import { View } from 'react-native';
import tw from '../utils/tailwind';
import FormControl from './FormControl';

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
  className?: string;
  styleLabel?: string;
  color?: string;
}

interface BaseRadioGroupProps {
  options?: RadioOption[];
  children?: ReactNode;
  className?: string;
  orientation?: 'vertical' | 'horizontal';
}

interface RadioGroupProps extends BaseRadioGroupProps {
  type: 'radio';
  value: string;
  onValueChange: (value: string) => void;
}

interface CheckboxGroupProps extends BaseRadioGroupProps {
  type: 'checkbox';
  values: string[];
  onValuesChange: (values: string[]) => void;
}

type FormControlGroupProps = RadioGroupProps | CheckboxGroupProps;

const FormControlGroup: FC<FormControlGroupProps> = props => {
  const {
    options,
    children,
    className,
    orientation = 'vertical',
    type = 'radio',
  } = props;

  const handleRadioPress = (optionValue: string) => {
    if (props.type === 'radio') {
      props.onValueChange(optionValue);
    }
  };

  const handleCheckboxPress = (optionValue: string) => {
    if (props.type === 'checkbox') {
      const currentValues = props.values;
      const isSelected = currentValues.includes(optionValue);

      if (isSelected) {
        // Remove from selection
        props.onValuesChange(currentValues.filter(v => v !== optionValue));
      } else {
        // Add to selection
        props.onValuesChange([...currentValues, optionValue]);
      }
    }
  };

  const isSelected = (optionValue: string) => {
    if (props.type === 'radio') {
      return props.value === optionValue;
    } else {
      return props.values.includes(optionValue);
    }
  };

  return (
    <View
      style={tw.style(
        'gap-2',
        {
          'flex-row flex-wrap': orientation === 'horizontal',
          'flex-col': orientation === 'vertical',
        },
        className,
      )}
    >
      {children ||
        options?.map(option => {
          const commonProps = {
            key: option.value,
            label: option.label,
            onPress: () =>
              type === 'radio'
                ? handleRadioPress(option.value)
                : handleCheckboxPress(option.value),
            disabled: option.disabled,
            labelClassName: `${option.styleLabel} ${
              orientation === 'vertical' ? 'flex-1' : 'flex-none'
            }`,
            className: option.className,
            color: option.color,
          };

          if (type === 'radio') {
            return (
              <FormControl
                {...commonProps}
                type="radio"
                value={option.value}
                selected={isSelected(option.value)}
              />
            );
          } else {
            return (
              <FormControl
                {...commonProps}
                type="checkbox"
                selected={isSelected(option.value)}
              />
            );
          }
        })}
    </View>
  );
};

export default FormControlGroup;
