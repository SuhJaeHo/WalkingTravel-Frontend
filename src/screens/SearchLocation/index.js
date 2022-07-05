import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { updateDestination } from "../../store/slices/destinationSlice";

import PlaceAutoCompleteAPI from "../../api/PlaceAutoCompleteAPI";
import PlaceDetailsAPI from "../../api/PlaceDetailsAPI";

import { getKilometers } from "../../utils/utils";

export default function SearchLocationScreen({ navigation }) {
  const [inputText, setInputText] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const dispatch = useDispatch();
  const currentPosition = useSelector(state => state.user.currentPosition);

  const handleInputTextChange = async text => {
    setInputText(text);

    const searchResult = await PlaceAutoCompleteAPI(text, currentPosition);
    setSearchResult(searchResult.predictions);
  };

  const handleSearchListPress = async (placeId, distance) => {
    const { message, region, photoURL } = await PlaceDetailsAPI(placeId);

    if (message === "success") {
      dispatch(updateDestination({ region, photoURL, distance }));

      navigation.navigate("Main", { selected: true });
    }
  };

  const renderItem = ({ item }) => {
    const { description, distance_meters, place_id } = item;

    const distance = getKilometers(distance_meters);

    return (
      <Pressable
        style={styles.searchResultContainer}
        onPress={() => handleSearchListPress(place_id, distance)}
      >
        <Text>{description}</Text>
        <Text>{distance}</Text>
      </Pressable>
    );
  };

  const renderSeperator = () => {
    return <View style={styles.seperatorLine}></View>;
  };

  const renderListEmpty = () => {
    return (
      <View>
        <Text>Not Search</Text>
      </View>
    );
  };

  return (
    <View>
      <TextInput
        placeholder="Search Location"
        onChangeText={handleInputTextChange}
        value={inputText}
      />
      <FlatList
        data={searchResult}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeperator}
        ListEmptyComponent={renderListEmpty}
        keyExtractor={item => item.place_id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchResultContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  seperatorLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
});
