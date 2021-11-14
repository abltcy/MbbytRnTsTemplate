import {resizeFont, theme} from 'src/common/constants';
import {Box, Text} from 'native-base';
import React from 'react';
import {Switch as Sw} from 'react-native';

export const Switch = ({
  title,
  initialValue,
  onChange,
}: {
  title: string;
  initialValue: boolean;
  onChange: () => void;
}) => {
  return (
    <Box
      mx="20px"
      my="10px"
      flexDirection="row"
      alignItems="center"
      justifyContent={'space-between'}>
      <Text fontFamily={theme.fonts.regular} fontSize={resizeFont(16)}>
        {title}
      </Text>
      <Sw
        trackColor={{false: theme.colors.gray, true: theme.colors.green}}
        thumbColor={'#ffffff'}
        ios_backgroundColor={theme.colors.gray}
        onValueChange={() => {
          onChange();
        }}
        value={initialValue}
      />
    </Box>
  );
};
