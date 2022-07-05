import React from "react";
import { StyleSheet, Pressable, Text, Dimensions } from "react-native";

export default function SearchLocationBar({ navigation }) {
  const handlePress = () => {
    navigation.navigate("SearchLocation");
  };

  return (
    <Pressable style={styles.searchBarContainer} onPress={handlePress}>
      <Text>Location Search</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    width: Dimensions.get("window").width * 0.9,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#fff",
    position: "absolute",
    top: 10,
    left: Dimensions.get("window").width * 0.05,
    alignItems: "center",
    justifyContent: "center",
  },
});
