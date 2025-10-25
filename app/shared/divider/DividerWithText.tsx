import { View } from 'react-native';
import Divider from '.';
import tw from '../../utils/tailwind';
import Heading, { IHeading } from '../Heading';

const DividerWithText = ({
  className,
  textProps,
}: {
  className?: string;
  textProps: IHeading;
}) => {
  return (
    <View style={tw.style('flex-row items-center justify-between', className)}>
      <Divider variant="tertiary" className='w-[40%]'/>
      <Heading {...textProps}>{textProps.children}</Heading>
      <Divider variant="tertiary" className='w-[40%]'/>
    </View>
  );
};

export default DividerWithText;
