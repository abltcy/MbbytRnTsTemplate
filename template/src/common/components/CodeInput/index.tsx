import React, {useEffect, useState} from 'react';
import {Box} from 'native-base';
import {StyleSheet} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {StyledCell} from './styles';

export type CodeFieldType = {
  cellCount: number;
  type: string;
};

const CodeInput = ({cellCount, type}: CodeFieldType) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: cellCount});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  useEffect(() => {
    if (value.length === cellCount) {
      type === 'changeNumber' ? console.log(type) : console.log(type);
    }
  }, [value]);
  return (
    <Box justifyContent={'center'} alignItems={'center'}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        autoFocus={false}
        onChangeText={setValue}
        cellCount={cellCount}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <StyledCell
            key={index}
            focused={isFocused}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </StyledCell>
        )}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CodeInput;
