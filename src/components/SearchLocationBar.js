import React from "react";
import { StyleSheet, Pressable, Text, Dimensions } from "react-native";

import { useSelector } from "react-redux";

export default function SearchLocationBar({ navigation }) {
  const destination = useSelector(state => state.destination.destination);

  const handlePress = () => {
    navigation.navigate("SearchLocation");
  };

  return (
    <Pressable style={styles.searchBarContainer} onPress={handlePress}>
      <Text>{destination.placeName}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#fff",
    position: "absolute",
    top: 10,
    left: Dimensions.get("window").width * 0.15,
    alignItems: "center",
    justifyContent: "center",
  },
});
