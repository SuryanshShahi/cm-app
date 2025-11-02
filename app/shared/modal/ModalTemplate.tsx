import React, { FC, PropsWithChildren } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import tw from '../../utils/tailwind';
import { height } from '../../utils/constants';
import { Feather } from '../../utils/Icons';
import CustomModal, { ICustomModal } from './Modal';
interface IModalTemplate {
  className?: string;
  hideNotch?: boolean;
  modalProps: ICustomModal;
  title?: string;
  containerClassName?: string;
  showCross?: boolean;
  fullHeight?: boolean;
}
const ModalTemplate: FC<PropsWithChildren<IModalTemplate>> = ({
  children,
  className,
  hideNotch,
  modalProps,
  title,
  containerClassName,
  showCross,
  fullHeight,
}) => {
  const { close } = modalProps ?? {};
  return (
    <CustomModal {...modalProps}>
      <View
        style={[
          tw.style(
            'bg-white rounded-t-3xl pb-4',
            {
              'gap-y-6 mx-5 p-5 rounded-3xl': Boolean(showCross),
              'pt-2': Boolean(hideNotch),
            },
            className,
          ),
          fullHeight && { height: height - 100 },
        ]}
      >
        {!hideNotch && (
          <TouchableOpacity style={tw`pb-2 pt-5`} onPress={close}>
            <View
              style={tw`bg-[rgba(0,0,0,0.1)] h-[5px] w-[50px] rounded mx-auto`}
            />
          </TouchableOpacity>
        )}
        {showCross && (
          <TouchableOpacity
            onPress={close}
            style={tw`bg-white h-11 w-11 rounded-full absolute self-center z-10 items-center justify-center`}
          >
            <Feather name="x" size={24} style={tw`text-black`} />
          </TouchableOpacity>
        )}
        <View style={[tw.style(showCross && 'mt-16', containerClassName)]}>
          {title && (
            <Text
              style={tw`font-semibold text-black text-center text-xl pb-2 pt-2`}
              numberOfLines={1}
            >
              {title}
            </Text>
          )}
          {children}
        </View>
      </View>
    </CustomModal>
  );
};

export default ModalTemplate;
