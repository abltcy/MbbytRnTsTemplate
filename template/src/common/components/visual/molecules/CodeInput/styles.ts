import styled from 'styled-components/native';
import {Text, Box} from 'native-base';
import {
  resizeFont,
  resizeWidth,
  resizeHeight,
  theme,
} from 'src/common/constants';
export interface StyledCodeInputCellProps {
  focused?: boolean;
  onLayout?: any;
}

export const StyledCellBox = styled(Box)<StyledCodeInputCellProps>`
  width: ${resizeWidth(50)}px;
  height: ${resizeHeight(50)}px;
  padding-top: ${resizeWidth(8)}px;
  border-radius: ${resizeWidth(5)}px;
  background-color: #ffffff;
  border-style: solid;
  border-width: 1px;
  align-items: center;
  justify-content: center;
  border-color: ${({focused}) =>
    !focused ? theme.colors.input.borderColor : theme.colors.green};
`;

export const StyledCell = styled(Text)`
  font-size: ${resizeFont(22)};
  text-align: center;
  color: ${theme.colors.black};
  align-self: center;
`;
