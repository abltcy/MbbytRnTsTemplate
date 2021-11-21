import React from 'react';
import {
  StyledContainer,
  StyledScrollContent,
  StyledGradientContainer,
} from 'src/common/styles';
import {IScreenProps, SCREEN_TYPES} from './types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScreenHeader} from '../visual';

export const Screen: React.FC<IScreenProps> = ({
  header,
  safeArea,
  bgColor,
  screenType,
  gradient,
  testID,
  children,
}) => {
  const insets = useSafeAreaInsets();
  const renderDefaultScreen = () => (
    <StyledContainer
      bgColor={bgColor ? bgColor : 'white'}
      pTop={safeArea ? insets.top : 0}
      testID={testID}
      pBottom={safeArea ? insets.bottom : 0}>
      {header && <ScreenHeader {...header} />}
      {children}
    </StyledContainer>
  );

  const renderScrolledScreen = () => (
    <StyledContainer
      bgColor={bgColor ? bgColor : 'white'}
      testID={testID}
      pTop={safeArea ? insets.top : 0}
      pBottom={safeArea ? insets.bottom : 0}>
      {header && <ScreenHeader {...header} />}
      <StyledScrollContent testID="test-scroll-view" pTop={0} pBottom={0}>
        {children}
      </StyledScrollContent>
    </StyledContainer>
  );

  const renderGradientScreen = () => (
    <StyledGradientContainer
      colors={
        gradient ? gradient?.colors : ['rgb(75,189,252)', 'rgb(24,45,255)']
      }
      testID={testID}
      bgColor={bgColor ? bgColor : 'white'}
      pTop={safeArea ? insets.top : 0}
      pBottom={safeArea ? insets.bottom : 0}>
      {header && <ScreenHeader {...header} />}
      {children}
    </StyledGradientContainer>
  );

  const RenderScreen = () => {
    switch (screenType) {
      case SCREEN_TYPES.SCROLLED:
        return renderScrolledScreen();
      case SCREEN_TYPES.GRADIENT:
        return renderGradientScreen();
      default:
        return renderDefaultScreen();
    }
  };
  return <RenderScreen />;
};
