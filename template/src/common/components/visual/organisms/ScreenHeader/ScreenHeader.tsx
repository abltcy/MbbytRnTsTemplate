import {useNavigation} from '@react-navigation/native';
import {Box, Text} from 'native-base';
import React from 'react';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import ShareIcon from 'react-native-vector-icons/Feather';
import EditIcon from 'react-native-vector-icons/FontAwesome';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import {
  resizeFont,
  resizeHeight,
  resizeHeightPx,
  resizeWidth,
  theme,
} from 'src/common/constants';
import {IconWrapper} from './IconWrapper';
import {SpringPressable} from '../../atoms';
import {ScreenHeaderProps} from './types';

EditIcon.loadFont();
ShareIcon.loadFont();
CloseIcon.loadFont();

const styles = StyleSheet.create({
  shadowStyle: {
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(20, 21, 25, 0.05)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
  },
});

export const ScreenHeader = ({
  leftVariant,
  titleVariant,
  rightVariant,
  headerTitle,
  headerCount,
  headerSubtitle,
  headerRight,
  shadow = false,
  filterCount,
  handleHeaderPress,
  handleClosePress,
  callOptions,
  callOptionsVisible,
}: ScreenHeaderProps) => {
  const navigation = useNavigation();
  const mediumFont = theme.fonts.medium;
  const boldFont = theme.fonts.bold;
  const safeAreaInsets = useSafeAreaInsets();

  const shadowType = () => {
    switch (shadow) {
      case true:
        return Platform.OS === 'ios' ? styles.shadowStyle : {elevation: 1};
      default:
        return undefined;
    }
  };

  const goBack = () => navigation.goBack();

  const headerLeftType = () => {
    switch (leftVariant) {
      case 'back':
        return (
          <SpringPressable
            id={leftVariant}
            onPress={handleClosePress || goBack}>
            <FaIcon name={'arrow-left'} size={15} />
          </SpringPressable>
        );
      case 'close':
        return (
          <SpringPressable
            id={leftVariant}
            onPress={handleClosePress ? handleClosePress : goBack}>
            <FaIcon name="close" size={22} />
          </SpringPressable>
        );
      case 'menu':
        return (
          <SpringPressable
            id={leftVariant}
            onPress={() => {
              console.log('open side menu');
            }}>
            <FaIcon name="list" size={22} />
          </SpringPressable>
        );
      default:
        return undefined;
    }
  };

  const headerTitleType = () => {
    switch (titleVariant) {
      case 'title':
        return (
          <Text
            textAlign="center"
            fontSize={resizeFont(16)}
            fontWeight={800}
            fontFamily={boldFont}>
            {headerTitle}
          </Text>
        );
      case 'withCount':
        return (
          <Box flexDirection="row">
            <Text
              textAlign="center"
              fontSize={resizeFont(16)}
              fontWeight={800}
              fontFamily={boldFont}>
              {headerTitle}
            </Text>
            <Text
              textAlign="center"
              fontSize={resizeFont(16)}
              fontWeight={800}
              fontFamily={boldFont}>
              ({headerCount})
            </Text>
          </Box>
        );
      case 'withSubtitle':
        return (
          <Box>
            <Text
              textAlign="center"
              fontSize={resizeFont(16)}
              fontWeight={800}
              fontFamily={boldFont}>
              {headerTitle}
            </Text>
            <Text
              fontFamily={mediumFont}
              textAlign="center"
              fontSize={resizeFont(12)}
              fontWeight={400}
              opacity={0.6}>
              {headerSubtitle}
            </Text>
          </Box>
        );
      default:
        return undefined;
    }
  };

  const headerRightType = () => {
    switch (rightVariant) {
      case 'next':
        return (
          <SpringPressable id={rightVariant} onPress={handleHeaderPress}>
            <Text
              textAlign="center"
              fontSize={resizeFont(16)}
              fontWeight={600}
              fontFamily={mediumFont}>
              Next
            </Text>
          </SpringPressable>
        );
      case 'done':
        return (
          <SpringPressable id={rightVariant} onPress={handleHeaderPress}>
            <Text
              color={theme.colors.header.right.active}
              textAlign="center"
              fontSize={resizeFont(16)}
              fontWeight={600}
              fontFamily={mediumFont}>
              Done
            </Text>
          </SpringPressable>
        );
      case 'share':
        return (
          <IconWrapper id={rightVariant} onPress={handleHeaderPress}>
            <ShareIcon name="share" size={resizeHeight(16)} />
          </IconWrapper>
        );
      case 'filter':
        return (
          <IconWrapper id={rightVariant} onPress={handleHeaderPress}>
            {filterCount ? (
              <Box
                h={resizeWidth(15)}
                w={resizeWidth(15)}
                bg={theme.colors.header.right.active}
                rounded="full"
                position="absolute"
                justifyContent="center"
                top={-3}
                left={-3}
                style={{elevation: 2}}
                zIndex={10}>
                <Box alignItems="center">
                  <Text
                    fontWeight={500}
                    fontFamily={mediumFont}
                    fontSize={resizeFont(13)}
                    color="white"
                    lineHeight={0}>
                    {filterCount}
                  </Text>
                  <Box mt={1} />
                </Box>
              </Box>
            ) : null}
            <FaIcon name={'filter'} />
          </IconWrapper>
        );
      case 'edit':
        return (
          <IconWrapper id={rightVariant} onPress={handleHeaderPress}>
            <EditIcon name="edit" size={15} />
          </IconWrapper>
        );
      case 'custom':
        return headerRight;
      default:
        return undefined;
    }
  };

  return (
    <Box
      backgroundColor={theme.colors.black}
      px={resizeWidth(19)}
      h={safeAreaInsets.top + 55}
      justifyContent="flex-end">
      <Box h={55} flexDirection="row" justifyContent="space-between">
        <Box alignContent="center" flex={1}>
          {leftVariant ? (
            <Box alignContent="center" justifyContent="center" flex={1}>
              {headerLeftType()}
            </Box>
          ) : (
            <Box />
          )}
        </Box>
        <Box alignContent="center" justifyContent="center" flex={3}>
          {titleVariant ? (
            <Box justifyContent="center" alignItems="center" flex={3}>
              {headerTitleType()}
            </Box>
          ) : (
            <Box />
          )}
        </Box>
        <Box alignItems="flex-end" flex={1}>
          {rightVariant ? (
            <Box justifyContent="center" flex={1}>
              {headerRightType()}
            </Box>
          ) : (
            <Box />
          )}
        </Box>
      </Box>
    </Box>
  );
};
