import {Provider} from 'react-redux';
import {store} from './redux/store';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AxiosProvider} from './common/axios';

import {RootStack} from './navigation/RootStack';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>

      <AxiosProvider>
        <ActionSheetProvider>
          <Provider store={store}>
            <NavigationContainer>
              <StatusBar
                  barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              />
              <RootStack />
            </NavigationContainer>
            <FlashMessage position="bottom" />
          </Provider>

        </ActionSheetProvider>
      </AxiosProvider>
    </SafeAreaProvider>
  );
};

export default App;
