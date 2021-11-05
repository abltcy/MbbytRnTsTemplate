import {Provider} from 'react-redux';
import {store} from './redux/store';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootStack} from './navigation/RootStack';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const rtrn = (
    <SafeAreaProvider>
      <ActionSheetProvider>
        <Provider store={store}>
          <NavigationContainer>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <RootStack />
          </NavigationContainer>
        </Provider>
      </ActionSheetProvider>
    </SafeAreaProvider>
  );
  return rtrn;
};

export default App;
