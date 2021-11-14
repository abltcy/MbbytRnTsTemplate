import {Box} from 'native-base';
import React from 'react';
import {resizeWidth} from 'src/common/constants';
import {SpringPressable} from 'src/common/components';

interface IconWrapperProps {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onPress?: ({id}: {id: string}) => void;
  children: React.ReactNode;
}

export const IconWrapper = ({id, onPress, children}: IconWrapperProps) => (
  // @ts-ignore
  <SpringPressable id={id} onPress={onPress}>
    <Box
      mr={resizeWidth(12)}
      w={25}
      h={25}
      rounded="full"
      justifyContent="center"
      alignItems="center"
      bg="paleGrey">
      {children}
    </Box>
  </SpringPressable>
);
