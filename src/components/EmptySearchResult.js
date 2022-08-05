import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function EmptySearchResult() {
  return (
    <View style={styles.noneSearchContainer}>
      <Text>검색 결과 없음</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noneSearchContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
