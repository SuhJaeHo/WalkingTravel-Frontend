import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

import axios from "axios";
import Config from "react-native-config";

import { useDispatch } from "react-redux";
import { addUid } from "../../store/slices/userSlice";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    googleSiginConfigure();

    if (!checkIsLoggedIn()) {
      auth().onAuthStateChanged(onAuthStateChanged);
    }
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
        const uid = auth().currentUser.uid;
        dispatch(addUid(uid));

        navigation.navigate("Main");
      }
    }
  };

  const checkIsLoggedIn = () => {
    if (auth().currentUser) {
      const uid = auth().currentUser.uid;
      dispatch(addUid(uid));

      navigation.navigate("Main");
      return true;
    }

    return false;
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
