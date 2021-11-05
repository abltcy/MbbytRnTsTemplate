import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from 'src/redux/hooks';
import {decrement, increment, selectCount} from 'src/redux/reducers/counter.slice';

import {CrossIcon, CrossBlueIcon, HomeIcon} from 'src/assets/svg/icons';

import {resizeHeight, resizeWidth} from 'src/common/constants';
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
