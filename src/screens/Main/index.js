import React from "react";
import { View } from "react-native";

import GoogleMap from "../../components/GoogleMap";
import SearchLocationBar from "../../components/SearchLocationBar";

export default function MainScreen({ route, navigation }) {
  return (
    <View>
      <GoogleMap params={route.params} />
      <SearchLocationBar navigation={navigation} />
    </View>
  );
}
