import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

import axios from "axios";
import Config from "react-native-config";

export default function LoginScreen({ navigation }) {
  useEffect(() => {
    googleSiginConfigure();

    auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  const googleSiginConfigure = () => {
    GoogleSignin.configure({
      webClientId: Config.WEB_CLIENT_ID,
    });
  };

  const onAuthStateChanged = async user => {
    if (user) {
      const idToken = await user.getIdToken();

      const res = await axios.get(`${Config.SERVER_URL}/login`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (res.data.message === "success") {
        navigation.navigate("Main");
      }
    }
  };

  const handleGoogleLoginButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error.code);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error.code);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error.code);
      } else {
        console.log(error.code);
      }
    }
  };

  return (
    <View style={styles.container}>
      <GoogleSigninButton onPress={handleGoogleLoginButtonPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
