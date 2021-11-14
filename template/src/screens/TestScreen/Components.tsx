import React from 'react';
import {Box, Text} from 'native-base';
import {
  Input,
  Button,
  GradientButton,
  Switch,
  ShadowBox,
} from 'src/common/components';
import {theme} from 'src/common';

const TemplateComponents: React.FC = () => {
  return (
    <Box>
      <Input
        label={'Test Label'}
        placeHolder={'Test Placeholder'}
        keyboardType={'default'}
      />
      <Button
        id={'TestButton'}
        text={'Test Button'}
        textSize={20}
        backgroundColor={theme.colors.blue}
        h={50}
        mx={5}
      />
      <GradientButton
        id={'TestGradientButton'}
        text={'Test Gradient Button'}
        mx={5}
        my={5}
      />
      <Switch
        title={'Test Switch'}
        initialValue={false}
        onChange={() => {
          console.log('Switch state changed');
        }}
      />
      <ShadowBox h={100} mx={5} my={5}>
        <Box w={'100%'} h={100} alignItems={'center'} justifyContent={'center'}>
          <Text>Shadow Box</Text>
        </Box>
      </ShadowBox>
    </Box>
  );
};

export default TemplateComponents;
