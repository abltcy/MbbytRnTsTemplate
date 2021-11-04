import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {TestScreen} from 'screens/TestScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {InitialScreen} from "../screens/initialScreen";
const Stack = createNativeStackNavigator();
export const RootStack = () => {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {paddingTop: insets.top},
      }}>
      <Stack.Screen name={'Test'} component={TestScreen} />
      <Stack.Screen name={'Initial'} component={InitialScreen} />
    </Stack.Navigator>
  );
};
