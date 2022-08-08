const config = {
  preset: "react-native",
  setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js"],
  transformIgnorePatterns: ["node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)"],
  globals: {
    currentRegion: { latitude: 37.514579, longitude: 127.103041 },
    routes: [
      { latitude: 37.515455, longitude: 127.102593 },
      { latitude: 37.515384, longitude: 127.102613 },
      { latitude: 37.514414, longitude: 127.103089 },
      { latitude: 37.513498, longitude: 127.100227 },
      { latitude: 37.511228, longitude: 127.101867 },
    ],
  },
};

module.exports = config;
