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
import RNBootSplash from 'react-native-bootsplash';
import {useAuth} from './common/hooks';

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
            <NavigationContainer>
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              />
              <Root />
            </NavigationContainer>
            <FlashMessage position="bottom" />
          </SafeAreaProvider>
        </AxiosProvider>
      </ActionSheetProvider>
    </Provider>
  );
};

export default App;
