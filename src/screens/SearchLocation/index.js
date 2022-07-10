import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

import { useSelector, useDispatch } from "react-redux";
import { updateDestination } from "../../store/slices/destinationSlice";
import { updateSheetState } from "../../store/slices/bottomSheetSlice";

import PlaceAutoCompleteAPI from "../../api/PlaceAutoCompleteAPI";
import PlaceDetailsAPI from "../../api/PlaceDetailsAPI";

import { getKilometers } from "../../utils/utils";

export default function SearchLocationScreen({ navigation }) {
  const [inputText, setInputText] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const dispatch = useDispatch();
  const currentRegion = useSelector(state => state.user.currentRegion);

  const handleInputTextChange = async text => {
    setInputText(text);

    const searchResult = await PlaceAutoCompleteAPI(text, currentRegion);
    setSearchResult(searchResult.predictions);
  };

  const handlePressSearchList = async (placeName, placeId, distance) => {
    const { message, region, photoURL } = await PlaceDetailsAPI(placeId);

    if (message === "success") {
      dispatch(updateDestination({ placeName, region, photoURL, distance }));
      dispatch(updateSheetState());

      navigation.navigate("Main", { selected: true });
    }
  };

  const handlePressBackButton = () => {
    navigation.navigate("Main");
  };

  const renderItem = ({ item }) => {
    const { structured_formatting, distance_meters, place_id } = item;

    const distance = getKilometers(distance_meters);

    return (
      <Pressable
        style={styles.searchListContainer}
        onPress={() =>
          handlePressSearchList(
            structured_formatting.main_text,
            place_id,
            distance
          )
        }
      >
        <Ionicons name={"location-sharp"} size={30} />
        <Text>{structured_formatting.main_text}</Text>
        <Text>{distance}</Text>
      </Pressable>
    );
  };

  const renderSeperator = () => {
    return <View style={styles.seperatorLine}></View>;
  };

  const renderListEmpty = () => {
    return <Text>Not Search</Text>;
  };

  return (
    <View>
      <View style={styles.searchInputContainer}>
        <Pressable onPress={handlePressBackButton}>
          <Ionicons name={"chevron-back-sharp"} size={30} color={"black"} />
        </Pressable>
        <TextInput
          placeholder="Search Location"
          onChangeText={handleInputTextChange}
          value={inputText}
        />
      </View>
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
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  seperatorLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
});
