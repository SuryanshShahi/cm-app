/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Modal, StatusBar, Text, TouchableOpacity } from 'react-native';
import NetworkLogger from 'react-native-network-logger';
import Toast from 'react-native-toast-message';
import { GlobalContext } from './app/context';
import AppNavigator from './app/navigators/AppNavigator';
import { toastConfig } from './app/utils/static';
import tw from './app/utils/tailwind';
import useApp from './useApp';
import { Loader } from './app/shared';
import { foregroundNotification } from './app/utils/notifications/notificationHandler';
import { notificationListener } from './app/utils/notifications/notificationServices';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const { data, setData, isActive, setIsActive, isLoading } = useApp();

  useEffect(() => {
    // Set up foreground notification handler
    foregroundNotification(queryClient);
    
    // Set up notification listeners (opened app from notification, initial notification)
    notificationListener();
  }, []);

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      <QueryClientProvider client={queryClient}>
        <StatusBar translucent backgroundColor="transparent" />
        {isLoading ? <Loader /> : <AppNavigator />}
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
