import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {TestScreen} from 'screens/TestScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {InitialScreen} from 'screens/initialScreen';
import {resizeFont, resizeHeight, resizeWidth, SCREENS, theme} from 'common';
import Cross from 'assets/svg/icons/Cross.svg';

const Stack = createNativeStackNavigator();
const TabStack = createBottomTabNavigator();

const styles = StyleSheet.create({
  iconContainer: {
    width: resizeWidth(20),
    height: resizeHeight(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: resizeHeight(12),
    marginBottom: resizeHeight(10),
  },
  label: {
    width: resizeWidth(70),
    fontSize: resizeFont(10),
    textAlign: 'center',
  },
});

const selectIcon = (name: string, isFocused: boolean) => {
  switch (name) {
    case SCREENS.Test:
      return isFocused ? (
        <View style={styles.iconContainer} />
      ) : (
        <View style={styles.iconContainer} />
      );
    case SCREENS.Initial:
      return isFocused ? (
        <View style={styles.iconContainer} />
      ) : (
        <View style={styles.iconContainer} />
      );
    default:
      return <>/*<Cross width={resizeWidth(17)} height={resizeHeight(17)} />;*/</>
  }
};

const selectLabel = (screenName: string): string => {
  switch (screenName) {
    case SCREENS.Test:
      return 'Test';
    case SCREENS.Initial:
      return 'Initial';
    default:
      return 'No Name';
  }
};

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
      <Stack.Screen name={'Main'}>
        {() => (
          <TabStack.Navigator
            screenOptions={({route}) => ({
              headerShown: false,
              headerTransparent: true,
              tabBarIcon: ({focused}) => selectIcon(route.name, focused),
              tabBarLabel: ({focused}) => (
                <View>
                  <Text style={styles.label}>{selectLabel(route.name)}</Text>
                </View>
              ),
            })}>
            <TabStack.Screen name={SCREENS.Test} component={TestScreen} />
            <TabStack.Screen name={SCREENS.Initial} component={InitialScreen} />
          </TabStack.Navigator>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
