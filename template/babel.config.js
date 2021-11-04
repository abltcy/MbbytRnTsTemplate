module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          store: './redux/store',
          assets: './assets',
          common: './common',
          selectors: './selectors',
          navigation: './navigation',
          screens: './screens',
          features: './features',
        },
      },
    ],
  ],
};
