import { useMutation } from '@tanstack/react-query';
import { shareFeedback } from '../../apis';
import { showToast } from '../../utils/constants';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const useHook = () => {
  const navigation = useNavigation();
  const [feedback, setFeedback] = useState('');
  const { mutate: submitFeedback, isPending } = useMutation({
    mutationFn: (body: { title: string; description: string }) =>
      shareFeedback(body),
    onSuccess: () => {
      showToast({
        text1: 'Feedback shared successfully',
        type: 'success',
      });
      setFeedback('');
      navigation.goBack();
    },
    onError: () => {
      showToast({
        text1: 'Failed to share feedback',
        type: 'error',
      });
    },
  });

  return { submitFeedback, isPending, feedback, setFeedback };
};

export default useHook;
