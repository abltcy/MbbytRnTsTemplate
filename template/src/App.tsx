import {Provider} from 'react-redux';
import {store} from './redux/store';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStack} from './navigation/RootStack';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const rtrn = (
    <SafeAreaProvider>
        <Provider store={store}>
            <NavigationContainer>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
                <RootStack />
            </NavigationContainer>
        </Provider>
    </SafeAreaProvider>
  );
  const rtrn1 = (
    <Provider store={store}>

        <SafeAreaProvider style={{paddingTop: 50}}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <NavigationContainer>
                <RootStack />
            </NavigationContainer>
        </SafeAreaProvider>
    </Provider>
  );
  return rtrn;
};

export default App;
