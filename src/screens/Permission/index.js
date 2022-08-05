import React from "react";
import { StyleSheet, View, Text, Pressable, Dimensions, PermissionsAndroid, Platform } from "react-native";

import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function PermissionScreen({ navigation }) {
  const handlePressButton = async () => {
    if (Platform.OS === "android") {
      const permissionResult = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);

      if (permissionResult["android.permission.ACCESS_FINE_LOCATION"] === "granted" && permissionResult["android.permission.CAMERA"] === "granted") {
        navigation.navigate("Main");
      } else {
        alert("권한 허용 후에 서비스 이용이 가능합니다");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>접근 권한 승인</Text>
      <View style={styles.contentContainer}>
        <AntDesign name={"camera"} size={30} />
        <Text>카메라 접근 권한을 허용합니다.</Text>
      </View>
      <View style={styles.contentContainer}>
        <Entypo name={"location"} size={30} />
        <Text>위치 접근 권한을 허용합니다.</Text>
      </View>
      <Pressable style={styles.button} onPress={handlePressButton}>
        <Text style={styles.buttonText}>권한 허용</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    color: "black",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    margin: 15,
    alignItems: "center",
  },
  button: {
    width: Dimensions.get("window").width * 0.5,
    height: 50,
    borderRadius: 10,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
  },
});
