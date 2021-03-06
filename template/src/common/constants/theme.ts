import {Dimensions, PixelRatio, Platform} from 'react-native';

export const pr = (dimension: number) =>
  PixelRatio.roundToNearestPixel(dimension);

export const lightFont =
  Platform.OS === 'ios' ? 'AppleSDGothicNeo-Light' : 'sans-serif-light';
export const mediumFont =
  Platform.OS === 'ios' ? 'AppleSDGothicNeo-Medium' : 'sans-serif-medium';
export const regularFont =
  Platform.OS === 'ios' ? 'AppleSDGothicNeo-Regular' : 'sans-serif';
export const boldFont =
  Platform.OS === 'ios' ? 'AppleSDGothicNeo-Bold' : 'sans-serif-condensed';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
export const resizeHeight = (height: number) => (height * SCREEN_HEIGHT) / 812;
export const resizeWidth = (width: number) => (width * SCREEN_WIDTH) / 375;
export const resizeHeightPx = (height: number) =>
  `${(height * SCREEN_HEIGHT) / 812}px`;
export const resizeWidthPx = (width: number) =>
  `${(width * SCREEN_WIDTH) / 375}px`;

export const resizeFont = (size: number) => {
  const designRatio = 812 / 375;
  const screenRatio = SCREEN_HEIGHT / SCREEN_WIDTH;
  return (screenRatio * size) / designRatio;
};

export const theme = {
  colors: {
    background: 'rgba(239,242,247,1)',
    black: 'rgba(20,21,25,1)',
    blue: 'rgba(108,148,214,1)',
    green: 'rgba(83,204,188,1)',
    gray: 'rgb(98,98,98)',
    input: {
      borderColor: 'gray',
    },
    gradient: {
      colors: {
        start: '#5EC2BC',
        end: '#65D1B6',
        disabled: 'gray',
      },
      textColors: {
        active: 'black',
        disabled: 'white',
      },
    },
    header: {
      title: '',
      right: {
        active: '',
        deActive: '',
      },
    },
  },
  fonts: {
    bold: boldFont,
    medium: mediumFont,
    regular: regularFont,
  },
  fontConfig: {
    Sofia: {
      100: {
        normal: lightFont,
      },
      200: {
        normal: lightFont,
      },
      300: {
        light: lightFont,
      },
      400: {
        normal: regularFont,
      },
      500: {
        normal: mediumFont,
      },
      600: {
        normal: boldFont,
      },
      700: {
        normal: boldFont,
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`

  components: {
    Checkbox: {
      baseStyle: {
        _checkbox: {
          borderWidth: 1,
          borderRadius: 'md',
          rounded: 6,
        },
        _icon: {
          size: 'sm',
        },
      },
      defaultProps: {},
    },
  },
};
