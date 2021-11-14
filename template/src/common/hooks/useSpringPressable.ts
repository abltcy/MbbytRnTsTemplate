import { useMemo, useRef, useState } from 'react';
import { Animated, ViewStyle } from 'react-native';
import { useEffectAfterMount } from './useEffectAfterMount';

type useSpringPressableProps = {
  style?: ViewStyle;
};

/** @Remark to use, wrap in Animated.View */

export const useSpringPressable = ({ style }: useSpringPressableProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const inputRange = useMemo(() => [0, 1], []);
  const outputRange = useMemo(() => [1, 0.95], []);

  const scale = useMemo(
    () => animation.interpolate({ inputRange, outputRange }),
    [animation, inputRange, outputRange],
  );

  const animatedStyle = [
    { transform: [{ scale }], backgroundColor: 'transparent' },
    style,
  ];
  const springValue = isPressed ? 1 : 0;

  const handleSpringPress = () => setIsPressed((active) => !active);

  useEffectAfterMount(() => {
    Animated.spring(animation, {
      toValue: springValue,
      useNativeDriver: true,
      speed: 500,
      bounciness: 10,
    }).start();
  }, [animation, springValue]);

  return {
    handleSpringPress,
    isPressed,
    animatedStyle,
  };
};
