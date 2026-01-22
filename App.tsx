/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  AppState,
  AppStateStatus,
  Modal,
  StatusBar,
  Text,
  TouchableOpacity
} from 'react-native';
import NetworkLogger from 'react-native-network-logger';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import { GlobalContext } from './app/context';
import AppNavigator from './app/navigators/AppNavigator';
import {
  checkInitialNotifeeNotification,
  setupNotifeeForegroundHandler,
} from './app/utils/notifications/notifeeNotification';
import { foregroundNotification } from './app/utils/notifications/notificationHandler';
import { toastConfig } from './app/utils/static';
import tw from './app/utils/tailwind';
import useApp from './useApp';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const { data, setData, isActive, setIsActive, isLoading } = useApp();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    foregroundNotification(queryClient);
    const unsubscribe = setupNotifeeForegroundHandler();
    checkInitialNotifeeNotification();
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          checkInitialNotifeeNotification();
        }
        appState.current = nextAppState;
      },
    );

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hide();
    }
  }, [isLoading]);

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      <QueryClientProvider client={queryClient}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppNavigator />
        <Toast config={toastConfig} />
        <NetworkLogs
          isActive={isActive}
          setIsActive={() => setIsActive(!isActive)}
        />
      </QueryClientProvider>
    </GlobalContext.Provider>
  );
}

export default App;

const NetworkLogs = ({
  isActive,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: () => void;
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={setIsActive}
        style={tw`absolute z-10 bg-black rounded py-1 px-2 self-center mt-6`}
      >
        <Text style={tw`text-white text-xs`}>Logs</Text>
      </TouchableOpacity>
      <Modal
        visible={isActive}
        animationType="slide"
        onRequestClose={setIsActive}
      >
        <TouchableOpacity
          onPress={setIsActive}
          style={tw`absolute z-10 bottom-5 bg-black rounded py-1 px-2 self-center mt-4`}
        >
          <Text style={tw`text-white text-xs`}>close</Text>
        </TouchableOpacity>
        <NetworkLogger />
      </Modal>
    </>
  );
};
