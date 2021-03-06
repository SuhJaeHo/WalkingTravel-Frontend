import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Text, Image, Dimensions, Pressable } from "react-native";

import BottomSheet from "reanimated-bottom-sheet";

import { useDispatch, useSelector } from "react-redux";
import { startGuide, endGuide } from "../store/slices/destinationSlice";
import { updateSheetState } from "../store/slices/bottomSheetSlice";

import DirectionsAPI from "../api/DirectionsAPI";

export default function ViewDestination() {
  const dispatch = useDispatch();

  const currentRegion = useSelector(state => state.user.currentRegion);
  const currentPlaceName = useSelector(state => state.user.placeName);
  const destination = useSelector(state => state.destination.destination);
  const isBottomSheetOpen = useSelector(state => state.bottomSheet.isBottomSheetOpen);

  const bottomSheefRef = useRef(null);

  useEffect(() => {
    controlBottomSheet();
  }, [isBottomSheetOpen]);

  const renderContent = () => {
    return (
      <View style={styles.container}>
        {destination.photoURL && <Image source={{ uri: destination.photoURL }} style={styles.imageContainer} />}
        <View style={styles.contentContainer}>
          <View style={styles.infoTextContatiner}>
            <Text style={styles.infoText}>{destination.placeName}</Text>
            <Text style={styles.infoText}>{destination.distance}</Text>
          </View>
          <View>
            {!destination.isGuideStart ? (
              <Pressable style={styles.guideBtn} onPress={handlePressGuideButton}>
                <Text style={styles.guideText}>시작</Text>
              </Pressable>
            ) : (
              <Pressable style={styles.guideBtn} onPress={handlePressGuideButton}>
                <Text style={styles.guideText}>종료</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    );
  };

  const controlBottomSheet = () => {
    if (isBottomSheetOpen) return bottomSheefRef.current.snapTo(0);

    bottomSheefRef.current.snapTo(1);
  };

  const handlePressGuideButton = async () => {
    if (destination.isGuideStart) return dispatch(endGuide());

    const { routes, bearings } = await DirectionsAPI(currentRegion, currentPlaceName, destination);

    dispatch(startGuide({ routes, bearings }));
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
    height: "60%",
  },
  contentContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
  infoText: {
    fontSize: 28,
    color: "black",
  },
  guideBtn: {
    width: Dimensions.get("screen").width * 0.2,
    height: Dimensions.get("screen").height * 0.1,
    borderRadius: Dimensions.get("screen").height * 0.05,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  guideText: {
    color: "#fff",
    fontSize: 20,
  },
});
