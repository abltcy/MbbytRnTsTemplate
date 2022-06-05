import {Provider} from 'react-redux';
import {store} from './redux/store';
import React, {useEffect, useState} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AxiosProvider} from './common/axios';

import {RootStack} from './navigation/RootStack';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import FlashMessage from 'react-native-flash-message';
import {extendTheme, NativeBaseProvider} from 'native-base';
import RNBootSplash from 'react-native-bootsplash';
import {QueryClient, QueryClientProvider} from 'react-query';
import {useAuth} from './common/hooks';
import {theme} from 'src/common/constants';
import codePush from 'react-native-code-push';

const nbTheme = extendTheme({
  colors: theme.colors,
  fonts: theme.fonts,
  components: theme.components,
});

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
};

export const queryClient = new QueryClient();

const Root = () => {
  const {setAuth, requestNotificationPermission} = useAuth();
  const [appReady, setAppReady] = useState(false);

  const init = async () => {
    await requestNotificationPermission();
    await setAuth();
  };

  useEffect(() => {
    init().finally(async () => {
      setAppReady(true);
      await RNBootSplash.hide();
    });
  }, []);
  if (!appReady) {
    return null;
  }
  return <RootStack />;
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <ActionSheetProvider>
        <AxiosProvider>
          <SafeAreaProvider>
            <NativeBaseProvider theme={nbTheme}>
              <NavigationContainer>
                <QueryClientProvider client={queryClient}>
                  <StatusBar
                    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                  />
                  <Root />
                </QueryClientProvider>
              </NavigationContainer>
            </NativeBaseProvider>
            <FlashMessage position="bottom" />
          </SafeAreaProvider>
        </AxiosProvider>
      </ActionSheetProvider>
    </Provider>
  );
};

export default codePush(codePushOptions)(App);
