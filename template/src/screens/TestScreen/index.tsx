import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from 'src/redux/hooks';
import {
  decrement,
  increment,
  selectCount,
} from 'src/redux/reducers/counter.slice';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';

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
  const {showActionSheetWithOptions} = useActionSheet();
  const _onOpenActionSheet = () => {
    const options = ['Take Photo', 'Choose from Camera Roll', 'Cancel'];
    const destructiveButtonIndex = -1;
    const cancelButtonIndex = 2;
    console.log('éaction sheet');
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex: number) => {
        console.log({buttonIndex});
        buttonIndex === 0 && takePhoto();
        buttonIndex === 1 && choosePhoto();
      },
    );
  };
  const takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 279,
        maxWidth: 375,
      },
      async response => {
        imageResponse(response);
      },
    );
  };

  const choosePhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 200,
        maxWidth: 200,
      },
      async response => {
        imageResponse(response);
      },
    );
  };

  const imageResponse = (response: any) => {
    response?.assets?.map((file: any) => {
      console.log('this fill will upload to server', file);
    });
  };

  const openFlashMessage = () => {
    showMessage({
      message: 'This is the Flash message',
      type: 'default',
      backgroundColor: 'black',
      color: '#ffffff',
    });
  }



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

      <StyledContainer>
        <StyledHeader>
          <StyledHeaderText>Action sheet and pick image test</StyledHeaderText>
        </StyledHeader>
        <StyledRowContainer>
          <StyledButton onPress={() => _onOpenActionSheet()}>
            <StyledButtonText>Open Action Sheet</StyledButtonText>
          </StyledButton>
        </StyledRowContainer>
      </StyledContainer>

      <StyledContainer>
        <StyledHeader>
          <StyledHeaderText>Flash message test</StyledHeaderText>
        </StyledHeader>
        <StyledRowContainer>
          <StyledButton onPress={() => openFlashMessage()}>
            <StyledButtonText>Flash message</StyledButtonText>
          </StyledButton>
        </StyledRowContainer>
      </StyledContainer>

    </StyledScrollView>
  );
};
