import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from 'redux/reducers/counter.slice';

import CrossIcon from 'assets/svg/icons/Cross.svg';
import CrossBlueIcon from 'assets/svg/icons/CrossBlue.svg';
import HomeIcon from 'assets/svg/icons/Home.svg';
import {resizeHeight, resizeWidth} from 'common/constants';
import {
  StyledContainer,
  StyledButtonText,
  StyledScrollView,
  StyledButton,
  StyledHeader,
  StyledHeaderText,
  StyledRowContainer,
  StyledText,
  StyledTextContainer,
} from './styles';

export type TestScreenType = {
  navigation?: any;
  route?: any;
};

export const TestScreen = ({navigation, route}: TestScreenType) => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');
  const incrementValue = Number(incrementAmount) || 0;
  return (
    <StyledScrollView>
      <StyledContainer>
        <StyledHeader>
          <StyledHeaderText>Redux test</StyledHeaderText>
        </StyledHeader>
        <StyledRowContainer>
          <StyledButton onPress={() => dispatch(decrement())}>
            <StyledButtonText>Decrement value</StyledButtonText>
          </StyledButton>
          <StyledTextContainer>
            <StyledText>{count}</StyledText>
          </StyledTextContainer>
          <StyledButton onPress={() => dispatch(increment())}>
            <StyledButtonText>Increment value</StyledButtonText>
          </StyledButton>
        </StyledRowContainer>
      </StyledContainer>

      <StyledContainer>
        <StyledHeader>
          <StyledHeaderText>Navigation test</StyledHeaderText>
        </StyledHeader>
        <StyledRowContainer>
          <StyledButton onPress={() => navigation.navigate('Main')}>
            <StyledButtonText>Open Rn Page</StyledButtonText>
          </StyledButton>
        </StyledRowContainer>
      </StyledContainer>

      <StyledContainer>
        <StyledHeader>
          <StyledHeaderText>Svg test</StyledHeaderText>
        </StyledHeader>
        <StyledRowContainer>
          <CrossBlueIcon width={resizeWidth(17)} height={resizeHeight(17)} />
          <CrossIcon width={resizeWidth(17)} height={resizeHeight(17)} />
          <HomeIcon width={resizeWidth(17)} height={resizeHeight(17)} />
        </StyledRowContainer>
      </StyledContainer>
    </StyledScrollView>
  );
};
