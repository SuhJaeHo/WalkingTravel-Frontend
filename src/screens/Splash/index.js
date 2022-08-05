import { useEffect } from "react";

import SplashScreen from "react-native-splash-screen";

export default function Splash({ navigation }) {
  useEffect(() => {
    try {
      const splashTime = setTimeout(() => {
        SplashScreen.hide();

        navigation.navigate("Login");

        clearTimeout(splashTime);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }, []);
}
