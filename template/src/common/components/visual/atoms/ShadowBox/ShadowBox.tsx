import {Box} from 'native-base';
import React from 'react';
import {shadowStyle} from 'src/common/styles';
import {IShadowBoxProps} from './types';

export const ShadowBox = ({
  h,
  w,
  mx,
  my,
  px,
  mb,
  borderRadius,
  children,
  ...props
}: IShadowBoxProps) => (
  <Box
    w={w}
    h={h}
    mx={mx}
    my={my}
    px={px}
    mb={mb}
    backgroundColor="#ffffff"
    borderRadius={borderRadius || 12}
    style={shadowStyle}
    {...props}>
    {children}
  </Box>
);
