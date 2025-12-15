import React from 'react';
import ScreenTemplate from '../../shared/ScreenTemplate';
import { View } from 'react-native';
import { Heading, CardWrapper, Button, Chip } from '../../shared';
import tw from '../../utils/tailwind';
import InputField from '../../shared/buttons/InputField';
import useHook from './useHook';

const Feedback = () => {
  const { submitFeedback, isPending, feedback, setFeedback } = useHook();
  return (
    <ScreenTemplate
      className="gap-y-4"
      parentClassName="bg-white"
      bottomBar={
        <Button
          btnName="Submit Feedback"
          action={() =>
            submitFeedback({ title: 'General Feedback', description: feedback })
          }
          isLoading={isPending}
        />
      }
    >
      <View style={tw`gap-y-4`}>
        <Heading size="xl" className="text-center">
          Voice of the Worker
        </Heading>
        <CardWrapper className="bg-gray-100 gap-y-3 rounded-lg">
          <Heading size="base" type="semibold" className="text-center">
            Submit your Feedback Anonymously
          </Heading>
          <Heading className="text-center">
            Limited to 2 Submissions per week
          </Heading>
        </CardWrapper>
        <Heading size="base" type="semibold" className="text-center">
          You have 1 submission left this week
        </Heading>
        <View style={tw`mt-6 gap-y-4`}>
          <Chip
            title="Write your feedback here"
            variant="brand"
            size="md"
            className="px-4 mx-auto"
          />
          <InputField
            placeholder="Share your feedback....."
            className="h-[200px]"
            multiline
            numberOfLines={5}
            value={feedback}
            onChangeText={setFeedback}
          />
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default Feedback;
