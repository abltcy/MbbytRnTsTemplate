import {Box} from 'native-base';
import React from 'react';
import {Animated, Pressable} from 'react-native';
import {SpringPressableProps} from './types';
import {useSpringPressable} from 'src/common/hooks/useSpringPressable';

export const SpringPressable = ({
  children,
  style,
  id,
  withoutInnerView,
  onPress = () => {
    // This is intentional
  },
}: SpringPressableProps) => {
  const {handleSpringPress, isPressed, animatedStyle} = useSpringPressable({
    style,
  });

  const handleOnPress = () => {
    onPress({id, isPressed});
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={handleOnPress}
        onPressIn={handleSpringPress}
        onPressOut={handleSpringPress}>
        {withoutInnerView ? <>{children}</> : <Box>{children}</Box>}
      </Pressable>
    </Animated.View>
  );
};
