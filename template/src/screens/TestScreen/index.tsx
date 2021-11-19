import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from 'src/redux/hooks';
import {
  decrement,
  increment,
  selectCount,
  selectState,
  incrementAsync,
  decrementAsync,
} from 'src/redux/reducers/counter.slice';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

import {CrossIcon, CrossBlueIcon, HomeIcon} from 'src/assets/svg/icons';

import {resizeHeight, resizeWidth, SCREENS, theme} from 'src/common/constants';
import {
  StyledContainer,
  StyledButtonText,
  StyledButton,
  StyledHeader,
  StyledHeaderText,
  StyledRowContainer,
  StyledText,
  StyledTextContainer,
} from './styles';
import {StyledGradientContainer} from 'src/common/styles';

import {useCurrentUser} from 'src/common/hooks/useCurrentUser';
import {
  DefaultNavigationProp,
  DefaultRouteProp,
} from 'src/common/types/NavigationAndRouteParams.types';
import Config from 'react-native-config';
import {CodeInput, Screen} from 'src/common/components';
import MapView from 'react-native-maps';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Carousel from 'react-native-snap-carousel';
import {Box, Text} from 'native-base';
import {Dimensions} from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {SwipeList} from 'src/common/components/visual/organisms/SwipeList';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import TrashIcon from 'react-native-vector-icons/Ionicons';
import TemplateComponents from './Components';
import {SCREEN_TYPES} from 'src/common/components/Screen/types';
import {useTestCall} from 'src/api/calls/test';
import useAppState from 'react-native-appstate-hook';

export type TestScreenType = {
  navigation: DefaultNavigationProp;
  route?: DefaultRouteProp;
};

export const TestScreen = ({navigation}: TestScreenType) => {
  const count = useAppSelector(selectCount);
  const status = useAppSelector(selectState);
  const dispatch = useAppDispatch();
  const currentUser = useCurrentUser();
  const [idToken, setIdToken] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const {showActionSheetWithOptions} = useActionSheet();
  const {data, error, isLoading} = useTestCall();

  const {appState} = useAppState({
    onChange: newAppState => console.warn('App state changed to ', newAppState),
    onForeground: () => console.warn('App went to Foreground'),
    onBackground: () => console.warn('App went to background'),
  });

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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  const _renderCarauselItem = ({item}: {item: any}) => {
    return (
      <Box
        height={300}
        justifyContent={'center'}
        alignItems={'center'}
        backgroundColor={theme.colors.gray}
        borderRadius={10}>
        <Text fontSize={30}>{item.title}</Text>
      </Box>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const RenderSwipeListItem = ({
    item,
  }: {
    item: {title: string; key: string};
  }) => {
    return (
      <Box backgroundColor={'white'}>
        <Text fontSize={20}>{item.title}</Text>
      </Box>
    );
  };

  return (
    <Screen
      screenType={SCREEN_TYPES.SCROLLED}
      testID="test-screen"
      gradient={{colors: ['#ffffff', '#000000']}}
      header={{
        headerTitle: 'New Screen',
        titleVariant: 'title',
        rightVariant: 'next',
        leftVariant: 'menu',
        shadow: true,
      }}>
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
          <StyledButton
            testID="reduxTestIncrementButton"
            onPress={() => dispatch(increment())}>
            <StyledButtonText>Increment value</StyledButtonText>
          </StyledButton>
        </StyledRowContainer>
      </StyledContainer>

      <StyledContainer>
        <StyledHeader>
          <StyledHeaderText>Redux thunk test</StyledHeaderText>
        </StyledHeader>
        <StyledRowContainer>
          <StyledButton onPress={() => dispatch(decrementAsync(50))}>
            <StyledButtonText>Decrement value</StyledButtonText>
          </StyledButton>
          <StyledTextContainer>
            <StyledText>{status}</StyledText>
          </StyledTextContainer>
          <StyledButton onPress={() => dispatch(incrementAsync(100))}>
            <StyledButtonText>Increment value</StyledButtonText>
          </StyledButton>
        </StyledRowContainer>
      </StyledContainer>

      <StyledContainer>
        <StyledHeader>
          <StyledHeaderText>React query test</StyledHeaderText>
        </StyledHeader>
        <StyledRowContainer>
          <StyledTextContainer>
            <StyledText>isLoading = {JSON.stringify(isLoading)}</StyledText>
          </StyledTextContainer>
        </StyledRowContainer>
        <StyledRowContainer>
          <StyledTextContainer>
            <StyledText>error = {JSON.stringify(error)}</StyledText>
          </StyledTextContainer>
        </StyledRowContainer>
        <StyledRowContainer>
          <StyledTextContainer>
            <StyledText isTruncated={true}>
              {' '}
              data = {JSON.stringify(data)}
            </StyledText>
          </StyledTextContainer>
        </StyledRowContainer>
      </StyledContainer>

      <StyledContainer>
        <StyledHeader>
          <StyledHeaderText>Navigation test</StyledHeaderText>
        </StyledHeader>
        <StyledRowContainer>
          {/*@ts-ignore*/}
          <StyledButton onPress={() => navigation.navigate(SCREENS.Main)}>
            <StyledButtonText>Open Rn Page</StyledButtonText>
          </StyledButton>
        </StyledRowContainer>
      </StyledContainer>

      <StyledContainer>
        <StyledHeader>
          <StyledHeaderText>App state test</StyledHeaderText>
        </StyledHeader>
        <StyledRowContainer>
          <StyledText>App state: {appState}</StyledText>
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
          {/*@ts-ignore*/}
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

      <StyledContainer>
        <StyledHeader>
          <StyledHeaderText>Linear gradient Test</StyledHeaderText>
        </StyledHeader>
        <StyledRowContainer style={{height: 100}}>
          <StyledGradientContainer
            pTop={0}
            pBottom={0}
            colors={['#ffffff', '#000000']}
          />
        </StyledRowContainer>
      </StyledContainer>

      <StyledContainer>
        <StyledHeader>
          <StyledHeaderText>Map Test</StyledHeaderText>
        </StyledHeader>
        <StyledRowContainer>
          <MapView
            style={{height: 300, width: '100%'}}
            initialRegion={{
              latitude: 53.3957526,
              longitude: -2.9839239,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </StyledRowContainer>
      </StyledContainer>

      <StyledContainer>
        <StyledHeader>
          <StyledHeaderText>Date time picker Test</StyledHeaderText>
        </StyledHeader>
        <StyledButton onPress={() => showDatePicker()}>
          <StyledButtonText>Open</StyledButtonText>
        </StyledButton>
        <StyledRowContainer>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </StyledRowContainer>
      </StyledContainer>

      <StyledContainer>
        <StyledHeader>
          <StyledHeaderText>Rn Carausel Test</StyledHeaderText>
        </StyledHeader>
        <StyledContainer>
          <Carousel
            data={[{title: 'Slide1'}, {title: 'Slide2'}, {title: 'Slide3'}]}
            renderItem={_renderCarauselItem}
            sliderWidth={Dimensions.get('window').width - 50}
            itemWidth={Dimensions.get('window').width - 90}
          />
        </StyledContainer>
      </StyledContainer>

      <StyledContainer>
        <StyledHeader>
          <StyledHeaderText>Swipe list Test</StyledHeaderText>
        </StyledHeader>
        <StyledContainer>
          {/*<SwipeList
              data={[
                {title: 'item1', key: 'item1'},
                {title: 'item2', key: 'item2'},
                {title: 'item3', key: 'item3'},
              ]}
              swipeOnPress={i => console.log(i)}
              SwipeListRenderItem={RenderSwipeListItem}
              Icon={TrashIcon}
            />*/}
        </StyledContainer>
      </StyledContainer>

      <StyledContainer>
        <StyledHeader>
          <StyledHeaderText>Components Test</StyledHeaderText>
        </StyledHeader>
        <TemplateComponents />
      </StyledContainer>
    </Screen>
  );
};
