import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from 'src/redux/hooks';
import {
  decrement,
  increment,
  selectCount,
} from 'src/redux/reducers/counter.slice';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

import {CrossIcon, CrossBlueIcon, HomeIcon} from 'src/assets/svg/icons';

import {resizeHeight, resizeWidth, SCREENS} from 'src/common/constants';
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
import {StyledContainer as StyledDefaultComponent} from 'src/common/styles';

import {useCurrentUser} from 'src/common/hooks/useCurrentUser';
import {
  DefaultNavigationProp,
  DefaultRouteProp,
} from 'src/common/types/NavigationAndRouteParams.types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Config from 'react-native-config';
import CodeInput from "../../common/components/CodeInput";

export type TestScreenType = {
  navigation: DefaultNavigationProp;
  route?: DefaultRouteProp;
};

export const TestScreen = ({navigation}: TestScreenType) => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const currentUser = useCurrentUser();
  const [idToken, setIdToken] = useState('');
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
      // @ts-ignore
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
  };

  const getIdToken = async ({user}: {user: any}) => {
    const JWT = await user.getIdToken(true);
    setIdToken(JWT);
  };

  const insets = useSafeAreaInsets();
  return (
    <StyledDefaultComponent pTop={insets.top} pBottom={insets.bottom}>
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
            <StyledButton onPress={() => navigation.navigate(SCREENS.Main)}>
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

        <StyledContainer>
          <StyledHeader>
            <StyledHeaderText>Fire base login test</StyledHeaderText>
          </StyledHeader>
          <StyledRowContainer>
            <StyledButton onPress={() => getIdToken({user: currentUser})}>
              <StyledButtonText>Login anonymously</StyledButtonText>
            </StyledButton>
          </StyledRowContainer>
          <StyledRowContainer>
            <StyledTextContainer>
              <StyledText>{idToken}</StyledText>
            </StyledTextContainer>
          </StyledRowContainer>
        </StyledContainer>

        <StyledContainer>
          <StyledHeader>
            <StyledHeaderText>Stripe test</StyledHeaderText>
          </StyledHeader>
          <StyledRowContainer>
            <StyledButton onPress={() => navigation.navigate(SCREENS.Stripe)}>
              <StyledButtonText>Stripe screen</StyledButtonText>
            </StyledButton>
          </StyledRowContainer>
        </StyledContainer>

        <StyledContainer>
          <StyledHeader>
            <StyledHeaderText>ENV config file test</StyledHeaderText>
          </StyledHeader>
          <StyledRowContainer>
            <StyledTextContainer>
              <StyledText>{Config.CONFIG_FILE}</StyledText>
            </StyledTextContainer>
          </StyledRowContainer>
        </StyledContainer>

        <StyledContainer>
          <StyledHeader>
            <StyledHeaderText>Code input Test</StyledHeaderText>
          </StyledHeader>
          <StyledRowContainer>
            <StyledTextContainer>
              <CodeInput cellCount={4} type={'changeNumber'} />
            </StyledTextContainer>
          </StyledRowContainer>
        </StyledContainer>

      </StyledScrollView>
    </StyledDefaultComponent>
  );
};
