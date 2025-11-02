import { useNavigation } from '@react-navigation/native';
import React, {
  FC,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgArrow } from '../../svgs';
import tw from '../../utils/tailwind';
interface IHeader {
  name?: string;
  icon?: ReactNode;
  description?: string | ReactNode;
  rightContent?: ReactNode;
  styleHeader?: string;
  onPress?: () => void;
  customNavigation?: null | (() => void);
}

const Header: FC<PropsWithChildren<IHeader>> = ({
  name,
  description,
  rightContent,
  styleHeader,
  icon,
  onPress,
  children,
  customNavigation,
}) => {
  const animHeader = useRef<any>(new Animated.Value(-100)).current;
  useEffect(() => {
    Animated.spring(animHeader, {
      toValue: 0,
      delay: 0.2,
      useNativeDriver: true,
    }).start();
  }, []);
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  return (
    <Animated.View style={{ transform: [{ translateY: animHeader }] }}>
      <View style={tw`h-${top}px bg-brand`} />
      <View
        style={tw.style(
          `bg-brand flex-row items-center my-auto p-4 relative shadow-b-lg shadow-neutral-300`,
          styleHeader,
        )}
      >
        <TouchableOpacity
          style={tw`pr-3`}
          activeOpacity={icon ? 0.5 : 1}
          onPress={() => {
            if (customNavigation) {
              customNavigation();
            } else if (!icon && navigation) {
              navigation?.goBack();
            }
          }}
        >
          {icon || <SvgArrow height={28} width={28} stroke="white" />}
        </TouchableOpacity>
        {children ? (
          children
        ) : (
          <>
            <View style={tw`flex-1`}>
              <Text
                style={tw`text-black font-semibold capitalize ${
                  description ? 'text-lg' : 'text-xl'
                }`}
              >
                {name}
              </Text>
              {description && (
                <Text
                  style={tw`text-sm text-gray-500 capitalize`}
                  numberOfLines={1}
                >
                  {description}
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={tw`flex-row items-center gap-x-[6px] ml-auto`}
              onPress={onPress}
            >
              {rightContent}
            </TouchableOpacity>
          </>
        )}
      </View>
    </Animated.View>
  );
};

export default Header;
