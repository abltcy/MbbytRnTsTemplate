import React from 'react';
import {StyledLabel, StyledInputWrapper, StyledInput} from './styles';
import {IInputProps} from './types';

export const Input = ({
  label,
  placeHolder,
  autoCapitalize,
  keyboardType,
  ...props
}: IInputProps) => {
  return (
    <>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledInputWrapper>
        <StyledInput
          {...props}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          placeholder={placeHolder}
        />
      </StyledInputWrapper>
    </>
  );
};
