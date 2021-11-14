import {ReactNode} from 'react';

export type IShadowBoxProps = {
  h?: number | string;
  w?: number | string;
  mx?: number;
  my?: number;
  px?: number;
  mb?: number;
  borderRadius?: number;
  children: ReactNode;
};
