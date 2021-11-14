import React from 'react';

export type ButtonChangeParams = {id: string};

export type ButtonChangeType = (params: ButtonChangeParams) => void;

export type ButtonProps = {
  children?: React.ReactNode;
  id: string;
  text?: string;
  onChange?: ButtonChangeType;
  mt?: number;
  px?: number;
  mx?: number;
  w?: number;
  h?: number;
  fontWeight?: number;
  textSize?: number;
  isLoading?: boolean;
  medium?: boolean;
  backgroundColor?: string;
};
