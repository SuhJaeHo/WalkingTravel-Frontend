import React from "react";
import { StyleSheet, View } from "react-native";

export default function SearchResultSeperator() {
  return <View style={styles.seperatorLine}></View>;
}

const styles = StyleSheet.create({
  seperatorLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
});
