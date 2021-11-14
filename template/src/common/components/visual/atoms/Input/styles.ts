import {
  resizeFont,
  resizeHeight,
  resizeWidth,
  theme,
} from 'src/common/constants';
import {Text} from 'native-base';
import styled from 'styled-components/native';

export const StyledInputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${theme.colors.input.borderColor};
  margin: ${resizeWidth(5)}px ${resizeWidth(20)}px ${resizeWidth(10)}px
    ${resizeWidth(20)}px;
  padding-left: ${resizeWidth(10)}px;
  border-radius: 5px;
`;

export const StyledLabel = styled(Text)`
  margin-left: ${resizeWidth(20)}px;
  margin-top: ${resizeWidth(10)}px;
  font-size: ${resizeFont(14)};
  line-height: ${resizeFont(18)};
  text-align: left;
  color: ${theme.colors.black};
`;

export const StyledInput = styled.TextInput`
  border-width: 0px;
  background-color: white;
  height: ${resizeHeight(40)}px;
  width: 100%;
`;
