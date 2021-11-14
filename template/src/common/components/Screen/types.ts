import {ScreenHeaderProps} from '../visual/organisms/ScreenHeader/types';

export enum SCREEN_TYPES {
  SCROLLED = 'scrollContent',
  GRADIENT = 'gradientContent',
  DEFAULT = 'normalContent',
}

export interface IScreenProps {
  safeArea?: boolean;
  header?: ScreenHeaderProps;
  screenType?:
    | SCREEN_TYPES.SCROLLED
    | SCREEN_TYPES.GRADIENT
    | SCREEN_TYPES.DEFAULT;
  bgColor?: string;
  gradient?: {
    colors: string[];
  };
}
