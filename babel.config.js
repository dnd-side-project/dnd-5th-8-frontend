module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // plugins: [
    //   'transform-remove-console',
    //   'react-native-reanimated/plugin',
    // ],
    // env: {
    //   production: {
    //     plugins: ['transform-remove-console', 'react-native-reanimated/plugin'],
    //   },
    // },
  };
};
