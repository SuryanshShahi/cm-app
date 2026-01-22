import React, { ReactNode } from 'react';
import { View } from 'react-native';
import tw from '../utils/tailwind';
import Message from './Message';
import Button from './buttons';
import ModalTemplate from './modal/ModalTemplate';

const ConfirmationModal = ({
  action,
  close,
  title,
  description,
  leftBtnName,
  rightBtnName,
  icon,
  color,
  isRightBtnLoading,
  isActive,
}: {
  action: () => void;
  close: () => void;
  title: string;
  description: string;
  leftBtnName: string;
  rightBtnName: string;
  isRightBtnLoading?: boolean;
  icon: ReactNode;
  color: 'gray' | 'yellow' | 'red' | 'primary';
  isActive: boolean;
}) => {
  return (
    <ModalTemplate
      modalProps={{
        isActive,
        close,
      }}
      hideNotch
      containerClassName="bg-white rounded-t-3xl gap-y-6 px-6 pt-4"
    >
      <Message
        icon={icon}
        title={title}
        description={description}
        color={color}
      />
      <View style={tw`flex-row w-full items-center justify-between gap-x-3`}>
        <Button
          btnName={leftBtnName}
          className="bg-white border-gray-300 px-0 w-full flex-1"
          styleBtnName="text-base text-black"
          action={close}
        />
        <Button
          btnName={rightBtnName}
          className="w-full flex-1 px-0"
          styleBtnName="text-base font-semibold"
          action={action}
          isLoading={isRightBtnLoading}
        />
      </View>
    </ModalTemplate>
  );
};

export default ConfirmationModal;
