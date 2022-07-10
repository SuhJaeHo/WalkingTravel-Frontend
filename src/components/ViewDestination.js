import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
} from "react-native";

import BottomSheet from "reanimated-bottom-sheet";

import { useDispatch, useSelector } from "react-redux";
import { startGuide } from "../store/slices/destinationSlice";
import { updateSheetState } from "../store/slices/bottomSheetSlice";

import DirectionsAPI from "../api/DirectionsAPI";

export default function ViewDestination() {
  const dispatch = useDispatch();

  const currentRegion = useSelector(state => state.user.currentRegion);
  const currentPlaceName = useSelector(state => state.user.placeName);
  const destination = useSelector(state => state.destination.destination);
  const isBottomSheetOpen = useSelector(
    state => state.bottomSheet.isBottomSheetOpen
  );

  const bottomSheefRef = useRef(null);

  useEffect(() => {
    controlBottomSheet();
  }, [isBottomSheetOpen]);

  const renderContent = () => {
    return (
      <View style={styles.container}>
        {destination.photoURL && (
          <Image
            source={{ uri: destination.photoURL }}
            style={styles.imageContainer}
          />
        )}
        <Text>{destination.placeName}</Text>
        <Text>{destination.distance}</Text>
        <Pressable style={styles.startBtn} onPress={startDirectionGuide}>
          <Text style={styles.startText}>시작</Text>
        </Pressable>
      </View>
    );
  };

  const controlBottomSheet = () => {
    if (isBottomSheetOpen) {
      return bottomSheefRef.current.snapTo(0);
    }

    bottomSheefRef.current.snapTo(1);
  };

  const startDirectionGuide = async () => {
    const { points, routes } = await DirectionsAPI(
      currentRegion,
      currentPlaceName,
      destination
    );

    dispatch(startGuide({ points, routes }));
    dispatch(updateSheetState());
  };

  return (
    <BottomSheet
      ref={bottomSheefRef}
      renderContent={renderContent}
      snapPoints={[Dimensions.get("screen").height * 0.6, 0]}
      borderRadius={10}
      enabledGestureInteraction={true}
      enabledContentTapInteraction={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: "100%",
    height: "50%",
  },
  startBtn: {
    width: Dimensions.get("screen").width * 0.2,
    height: Dimensions.get("screen").height * 0.1,
    borderRadius: Dimensions.get("screen").height * 0.05,
    backgroundColor: "blue",
  },
  startText: {
    color: "#fff",
    fontSize: 20,
  },
});
