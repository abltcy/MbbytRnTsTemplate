import {Provider} from 'react-redux';
import {store} from './redux/store';
import React from 'react';
import {TestScreen} from './screens/TestScreen';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Provider store={store}>
      <SafeAreaView>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <TestScreen />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
