import React from "react";
import { StyleSheet, View } from "react-native";

import GoogleMap from "../../components/GoogleMap";
import SearchLocationBar from "../../components/SearchLocationBar";

import ViewDestination from "../../components/ViewDestination";

export default function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <GoogleMap />
      <SearchLocationBar navigation={navigation} />
      <ViewDestination />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
