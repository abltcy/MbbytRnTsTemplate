import {Box, Text} from 'native-base';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {resizeFont, resizeHeight, theme} from 'src/common/constants';
import {SpringPressable} from '../SpringPressable';
import {ButtonProps} from './types';

export const Button = ({
  children,
  id,
  text,
  mt,
  px,
  mx,
  w,
  h,
  fontWeight,
  textSize,
  isLoading = false,
  medium = false,
  backgroundColor = 'white',
  onChange = () => {
    // This is intentional
  },
}: ButtonProps) => {
  const handlePressAction = () => onChange({id});

  const fontSize = textSize ? resizeFont(textSize) : resizeFont(16);
  const fontFamily = medium ? theme.fonts.medium : theme.fonts.bold;
  const textWeight = fontWeight ? fontWeight : 700;

  return (
    <SpringPressable withoutInnerView id={id} onPress={handlePressAction}>
      <Box
        mt={mt}
        w={w}
        px={px}
        mx={mx}
        h={h || resizeHeight(45)}
        backgroundColor={backgroundColor}
        borderColor="gray"
        borderWidth={1}
        alignItems="center"
        borderRadius={8}
        justifyContent="center">
        {text ? (
          <Box flexDirection="row">
            {isLoading && <ActivityIndicator size="small" color="white" />}
            <Text
              fontSize={fontSize || 16}
              textAlign="center"
              fontFamily={fontFamily}
              fontWeight={textWeight}>
              {text}
            </Text>
          </Box>
        ) : (
          children
        )}
      </Box>
    </SpringPressable>
  );
};
