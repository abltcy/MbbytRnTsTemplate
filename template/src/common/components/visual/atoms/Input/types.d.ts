import {KeyboardTypeOptions} from 'react-native';

export type IInputProps = {
  label?: string | undefined;
  placeHolder?: string | undefined;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  onChangeText?: any;
  autoCorrect?: boolean;
  autoFocus?: boolean;
  value?: any;
};
