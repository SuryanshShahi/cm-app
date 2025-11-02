import React, { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from '../../utils/tailwind';

export interface ICustomModal {
  isActive: boolean;
  close?: () => void;
  modalClass?: string;
  animationType?: 'fade' | 'slide' | 'none';
}
const CustomModal: FC<PropsWithChildren<ICustomModal>> = ({
  isActive,
  close,
  children,
  modalClass,
}) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Modal
      style={tw.style(
        'm-0 justify-end',
        modalClass,
        bottom > 25 ? `mb-${bottom}px` : '',
      )}
      onSwipeComplete={close}
      isVisible={isActive}
      swipeDirection="down"
      backdropOpacity={0.5}
      onBackdropPress={close}
      statusBarTranslucent
      onBackButtonPress={close}
      useNativeDriverForBackdrop
    >
      <View>
        {children}
        {/* <KeyboardAwareScrollView
          enableOnAndroid={true}
          scrollEnabled={false}
          keyboardShouldPersistTaps="always">
          {children}
        </KeyboardAwareScrollView> */}
      </View>
    </Modal>
  );
};

export default CustomModal;
