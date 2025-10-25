import React, { FC, ReactNode } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '../utils/Icons';
import tw from '../utils/tailwind';

interface BaseFormControlProps {
  selected?: boolean;
  onPress: () => void;
  label?: ReactNode;
  disabled?: boolean;
  size?: number;
  className?: string;
  labelClassName?: string;
  value?: string;
  type: 'radio' | 'checkbox';
  color?: string;
}

const FormControl: FC<BaseFormControlProps> = ({
  type,
  selected,
  onPress,
  label,
  disabled = false,
  size = 20,
  className,
  labelClassName,
  value,
  color = 'tertiary',
}) => {
  const isSelected = selected;
  const accessibilityRole = type;

  const renderIndicator = () => {
    if (type === 'checkbox') {
      return isSelected ? (
        <Ionicons name="checkbox" size={size} style={tw`text-${color}`} />
      ) : (
        <MaterialIcons
          name="check-box-outline-blank"
          size={size}
          style={tw`text-${color}`}
        />
      );
    } else {
      return (
        <MaterialIcons
          name={isSelected ? 'radio-button-on' : 'radio-button-off'}
          size={size}
          style={tw`text-${color}`}
        />
      );
    }
  };

  const getAccessibilityProps = () => {
    const accessibilityLabel =
      typeof label === 'string'
        ? label
        : type === 'radio'
        ? value || 'Radio button'
        : 'Checkbox';

    const baseProps = {
      accessibilityRole: accessibilityRole as 'checkbox' | 'radio',
      accessibilityState: { checked: isSelected, disabled },
      accessibilityLabel,
    };

    if (type === 'radio' && value) {
      return {
        ...baseProps,
        accessibilityValue: { text: value },
      };
    }

    return baseProps;
  };

  return (
    <TouchableOpacity
      style={tw.style('flex-row items-center gap-2', className)}
      onPress={disabled ? undefined : onPress}
      activeOpacity={disabled ? 1 : 0.7}
      {...getAccessibilityProps()}
    >
      {renderIndicator()}
      {typeof label === 'string' ? (
        <Text
          style={tw.style(
            'text-base',
            {
              'text-gray-400': disabled,
              'text-gray-900': !disabled,
            },
            labelClassName || 'flex-1',
          )}
        >
          {label}
        </Text>
      ) : (
        label
      )}
    </TouchableOpacity>
  );
};

export default FormControl;
