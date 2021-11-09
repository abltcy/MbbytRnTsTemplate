import {Text} from 'native-base';
import {
  resizeFont,
  resizeHeight,
  resizeWidth,
  theme,
} from 'src/common/constants';
import {Image} from 'native-base';
import {TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
export type LabelType = {
  marginTop?: number;
};

export type StyledContainerType = {
  bgColor?: string;
  pTop?: number;
  pBottom?: number;
};

type ImageSize = {
  size: number;
};

export const StyledContainer = styled.View<StyledContainerType>`
  flex: 1;
  background-color: ${({bgColor}) => (bgColor ? bgColor : 'white')};
  ${({pBottom}) => `padding-bottom: ${pBottom}px;`}
  ${({pTop}) => `padding-top: ${pTop}px;`}
`;

export const StyledScrollContent = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

export const StyledGradientContainer = styled(LinearGradient).attrs({
  start: { x: 0.39, y: 0 },
  end: { x: 0.4, y: 1 },
  locations: [0, 0.9],
  colors: ['rgb(75,189,252)', 'rgb(24,45,255)'],
})`
  flex: 1;
`;

export const StyledLabel = styled(Text)<LabelType>`
  margin-left: ${resizeWidth(20)}px;
  margin-top: ${({marginTop}): number =>
    resizeWidth(marginTop ? marginTop : 30)}px;
  font-size: ${resizeFont(14)};
  line-height: ${resizeFont(18)};
  text-align: left;
  color: ${theme.colors.black};
  font-family: ${theme.fonts.medium};
`;

export const StyledInputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 5px;
  padding-left: 5px;
  border-width: 1px;
  border-color: ${theme.colors.gray};
  margin: ${resizeWidth(5)}px ${resizeWidth(20)}px ${resizeWidth(20)}px
    ${resizeWidth(20)}px;
  border-radius: 5px;
  height: 45px;
`;

export const StyledInput = styled(TextInput)`
  border-width: 0px;
  background-color: white;
  margin-left: 5px;
  height: ${resizeHeight(40)}px;
  font-family: ${theme.fonts.regular};
`;

export const StyledProfileImage = styled(Image)<ImageSize>`
  width: ${({size}) => resizeHeight(size)}px;
  height: ${({size}) => resizeHeight(size)}px;
  border-radius: ${({size}) => resizeHeight(size)}px;
  background-color: ${theme.colors.gray};
`;
