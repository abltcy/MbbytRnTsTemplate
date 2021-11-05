import {StackNavigationState, TypedNavigator} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {
  NativeStackNavigationEventMap,
  NativeStackNavigatorProps,
} from '@react-navigation/native-stack/lib/typescript/src/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import {RootStackParamsTypes} from '../common/types/RootStackParams.types';
import {SCREENS} from '../common/constants';
import {AddPaymentMethod} from '../Modals/Stripe/AddPaymentMethod';

export type ModalProps = {
  Stack: TypedNavigator<
    RootStackParamsTypes,
    StackNavigationState<Record<string, object | undefined>>,
    NativeStackNavigationOptions,
    NativeStackNavigationEventMap,
    ({
      initialRouteName,
      children,
      screenOptions,
      ...rest
    }: NativeStackNavigatorProps) => JSX.Element
  >;
};

export const Modals = ({Stack}: ModalProps) => (
  <>
    <Stack.Screen
      options={{presentation: 'modal'}}
      name={SCREENS.Stripe}
      component={AddPaymentMethod}
    />
  </>
);
