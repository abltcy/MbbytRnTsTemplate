import {Box, Pressable, Text} from 'native-base';
import React from 'react';
import {ActivityIndicator, Animated, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from 'src/common';
import {useSpringPressable} from 'src/common/hooks/useSpringPressable';
import {Styles} from './styles';

type GradientButtonChangeParams = {id: string};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type GradientButtonChangeType = (params: GradientButtonChangeParams) => void;

type GradientButtonProps = {
  children?: React.ReactNode;
  id: string | number;
  text?: string;
  onChange?: GradientButtonChangeType;
  style?: ViewStyle;
  isLoading?: boolean;
  width?: string | number;
  isDisabled?: boolean;
  px?: number;
  mx?: number;
  my?: number;
};

export const GradientButton = ({
  children,
  id,
  text,
  style,
  onChange = () => {
    // This is intentional
  },
  isLoading = false,
  width,
  px,
  mx,
  my,
  isDisabled = false,
}: GradientButtonProps) => {
  const {handleSpringPress, isPressed, animatedStyle} = useSpringPressable({
    style,
  });

  // @ts-ignore
  const handlePressAction = () => onChange({id});

  const textColour = isDisabled
    ? theme.colors.gradient.textColors.disabled
    : theme.colors.gradient.textColors.active;
  const firstColor = isDisabled
    ? theme.colors.gradient.colors.disabled
    : theme.colors.gradient.colors.start;

  const pressedColour = isPressed
    ? firstColor
    : theme.colors.gradient.colors.end;

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        w={width ? width : undefined}
        px={px}
        mx={mx}
        my={my}
        disabled={isDisabled}
        bg="transparent"
        rounded="md"
        onPress={handlePressAction}
        onPressIn={handleSpringPress}
        onPressOut={handleSpringPress}>
        <LinearGradient
          start={{x: 0.39, y: 0}}
          end={{x: 0.4, y: 1}}
          locations={[0, 0.9]}
          colors={[pressedColour, firstColor]}
          style={Styles.gradientButton}>
          {text ? (
            <Box flexDirection="row" flex={1} alignItems="center">
              {isLoading && <ActivityIndicator size="small" color="white" />}
              <Text
                fontWeight={700}
                fontFamily={theme.fonts.bold}
                color={textColour}>
                {text}
              </Text>
            </Box>
          ) : (
            {children}
          )}
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};
