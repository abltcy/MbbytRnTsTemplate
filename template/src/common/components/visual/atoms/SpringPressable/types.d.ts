import React from 'react';
import {ViewStyle} from 'react-native';

export interface SpringPressableParams {
  isPressed?: boolean;
  id: string | number;
}

export type SpringPressableType =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (({id, isPressed}: {id: string; isPressed?: boolean}) => void) | undefined;

export interface SpringPressableProps {
  children: React.ReactNode;
  style?: ViewStyle;
  id: string | number;
  withoutInnerView?: boolean;
  onPress?: SpringPressableType;
}
