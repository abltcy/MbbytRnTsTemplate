import React from 'react';
import {Screen, Switch} from 'src/common/components';
import {SCREEN_TYPES} from 'src/common/components/Screen/types';

export const NewScreen: React.FC = () => {
  return (
    <Screen
      screenType={SCREEN_TYPES.SCROLLED}
      gradient={{colors: ['#ffffff', '#000000']}}
      header={{
        headerTitle: 'New Screen',
        titleVariant: 'title',
        rightVariant: 'next',
        leftVariant: 'menu',
        shadow: true,
      }}>
      <Switch
        title={'Test'}
        initialValue={true}
        onChange={() => console.log('changed')}
      />
    </Screen>
  );
};
