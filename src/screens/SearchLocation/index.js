import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, FlatList } from "react-native";

import EmptySearchResult from "../../components/EmptySearchResult";
import SearchResultSeperator from "../../components/SearchResultSeperator";

import { useSelector, useDispatch } from "react-redux";
import { chooseDestination } from "../../store/slices/destinationSlice";
import { openBottomSheet } from "../../store/slices/bottomSheetSlice";

import PlaceAutoCompleteAPI from "../../api/PlaceAutoCompleteAPI";
import PlaceDetailsAPI from "../../api/PlaceDetailsAPI";

import { getKilometersFromMeters } from "../../utils/distance";

import Ionicons from "react-native-vector-icons/Ionicons";

export default function SearchLocationScreen({ navigation }) {
  const [inputText, setInputText] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const dispatch = useDispatch();
  const currentRegion = useSelector(state => state.user.currentRegion);

  const handleInputTextChange = async inputText => {
    setInputText(inputText);

    const { message, data } = await PlaceAutoCompleteAPI(inputText, currentRegion);

    if (message === "success") setSearchResult(data.predictions);
  };

  const handlePressList = async (address, id, distance) => {
    const { message, region, photoURL } = await PlaceDetailsAPI(id);

    if (message === "success") {
      dispatch(chooseDestination({ address, region, photoURL, distance }));
      dispatch(openBottomSheet());

      navigation.navigate("Main");
    }
  };

  const handlePressBackButton = () => {
    navigation.navigate("Main");
  };

  const searchList = ({ item }) => {
    const { structured_formatting, distance_meters, place_id } = item;

    const distance = getKilometersFromMeters(distance_meters);

    return (
      <Pressable style={styles.searchListContainer} onPress={() => handlePressList(structured_formatting.main_text, place_id, distance)}>
        <Ionicons name={"location-sharp"} size={30} color={"blue"} />
        <Text>{structured_formatting.main_text}</Text>
        <Text>{distance}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        <Pressable onPress={handlePressBackButton}>
          <Ionicons name={"chevron-back-sharp"} size={30} color={"black"} />
        </Pressable>
        <TextInput placeholder="장소 검색" onChangeText={handleInputTextChange} value={inputText} />
      </View>
      <FlatList
        data={searchResult}
        renderItem={searchList}
        ItemSeparatorComponent={SearchResultSeperator}
        ListEmptyComponent={<EmptySearchResult />}
        keyExtractor={item => item.place_id}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 2,
  },
  searchListContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    paddingLeft: 5,
  },
});
