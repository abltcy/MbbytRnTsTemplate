import styled from 'styled-components/native';
import {TextInput} from 'react-native';
import {
  resizeFont,
  resizeHeight,
  resizeWidth,
  theme,
} from 'src/common/constants';
import {Text} from 'native-base';

export const StyledTopView = styled.View`
  flex: 1;
`;

export const StyledMainView = styled.View`
  flex: 3;
`;

export const StyledSecondView = styled.View`
  flex: 1;
`;

export const StyledLabel = styled(Text)`
  margin-top: ${resizeWidth(30)}px;
  font-size: ${resizeFont(14)};
  line-height: ${resizeFont(18)};
  text-align: left;
  color: ${theme.colors.black};
`;

export const StyledPayCardText = styled(Text)`
  justify-content: center;
  align-self: center;
  margin-top: 15px;
  font-size: ${resizeFont(12)};
  line-height: ${resizeFont(16)};
  color: ${theme.colors.black};
`;

export const StyledNameInputPrefixWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 5px;
  border-width: 1px;
  border-color: gray;
  margin: ${resizeWidth(10)}px 0px ${resizeWidth(10)}px 0px;
  border-radius: 5px;
`;

export const StyledNameInput = styled(TextInput)`
  border-width: 0px;
  background-color: white;
  height: ${resizeHeight(40)}px;
`;

export const StyledBottomView = styled.KeyboardAvoidingView`
  position: absolute;
  bottom: 30;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const StyledSaveButton = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  position: absolute;
  bottom: 30;
  width: 100%;
  height: ${resizeHeight(50)}px;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.black};
`;

export const StyledButtonText = styled(Text)`
  font-size: ${resizeFont(16)};
  line-height: ${resizeFont(21)};
  color: white;
`;
