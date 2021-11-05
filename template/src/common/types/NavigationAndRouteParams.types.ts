import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsTypes} from './RootStackParams.types';

export type DefaultNavigationProp = StackNavigationProp<RootStackParamsTypes>;
export type DefaultRouteProp = RouteProp<RootStackParamsTypes>;
