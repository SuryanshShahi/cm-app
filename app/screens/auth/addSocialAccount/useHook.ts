import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getSocialAccounts,
  linkFacebookAccount,
  linkInstagramAccount,
  linkTwitterAccount,
} from '../../../apis';
import { showToast } from '../../../utils/constants';
import { ISocialAccount } from '../types';
import { localstorageKeys } from '../../../utils/localstorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { GlobalContext } from '../../../context';

const useHook = () => {
  const { mutate: linkTwitter, isPending: isTwitterPending } = useMutation({
    mutationFn: () =>
      linkTwitterAccount({ cmId: '550e8400-e29b-41d4-a716-446655440001' }),
    onSuccess: () => refetch(),
    onError: (err: any) => {
      showToast({
        text1: err?.response?.data?.message,
      });
    },
  });
  const { mutate: linkFacebook, isPending: isFacebookPending } = useMutation({
    mutationFn: () =>
      linkFacebookAccount({ cmId: '550e8400-e29b-41d4-a716-446655440001' }),
    onSuccess: () => refetch(),
    onError: (err: any) => {
      showToast({
        text1: err?.response?.data?.message,
      });
    },
  });
  const { mutate: linkInstagram, isPending: isInstagramPending } = useMutation({
    mutationFn: () =>
      linkInstagramAccount({ cmId: '550e8400-e29b-41d4-a716-446655440001' }),
    onSuccess: () => refetch(),
    onError: (err: any) => {
      showToast({
        text1: err?.response?.data?.message,
      });
    },
  });
  const {
    data: socialAccounts,
    isLoading: isSocialAccountsLoading,
    refetch,
  } = useQuery<ISocialAccount>({
    queryKey: ['socialAccounts'],
    queryFn: getSocialAccounts,
  });

  const { setData } = useContext(GlobalContext);
  const handleLogin = async () => {
    const item = await AsyncStorage.getItem(localstorageKeys.TEMP_TOKEN);
    const data = item && JSON.parse(item);
    if (data) {
      AsyncStorage.setItem(localstorageKeys.AUTH_TOKEN, JSON.stringify(data));
      AsyncStorage.removeItem(localstorageKeys.TEMP_TOKEN);
      setData(p => ({ ...p, isLoggedIn: true }));
    }
  };
  return {
    linkFacebook,
    linkInstagram,
    linkTwitter,
    isTwitterPending,
    isFacebookPending,
    isInstagramPending,
    socialAccounts: socialAccounts?.connectedAccounts,
    isSocialAccountsLoading,
    handleLogin,
  };
};

export default useHook;
