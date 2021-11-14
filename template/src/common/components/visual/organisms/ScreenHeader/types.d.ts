import React from 'react';

export interface IDParams {
  id:
    | keyof ScreenHeaderProps['leftVariant']
    | keyof ScreenHeaderProps['titleVariant']
    | keyof ScreenHeaderProps['rightVariant'];
}

export type TitleVariant =
  | 'title'
  | 'withCount'
  | 'withDropDown'
  | 'withSubtitle';
export type HeaderTitle =
  | 'next'
  | 'done'
  | 'share'
  | 'filter'
  | 'edit'
  | 'custom';
export interface ScreenHeaderProps {
  leftVariant?: 'back' | 'close' | 'menu';
  titleVariant?: TitleVariant;
  rightVariant?: HeaderTitle;
  headerTitle?: string;
  headerCount?: string | number;
  headerSubtitle?: string;
  headerRight?: React.ReactNode;
  shadow?: boolean;
  modal?: boolean;
  filterCount?: number;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleHeaderPress?: ({id}: {id: string}) => void;
  handleClosePress?: () => void;
  callOptions?: React.ReactNode;
  callOptionsVisible?: boolean;
}
