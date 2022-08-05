import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Text, Image, Dimensions, Pressable } from "react-native";

import BottomSheet from "reanimated-bottom-sheet";

import { useDispatch, useSelector } from "react-redux";
import { startGuide, endGuide } from "../store/slices/destinationSlice";
import { closeBottomSheet } from "../store/slices/bottomSheetSlice";

import GeocodeAPI from "../api/GeocodeAPI";
import DirectionsAPI from "../api/DirectionsAPI";

export default function ViewDestination() {
  const dispatch = useDispatch();

  const currentRegion = useSelector(state => state.user.currentRegion);

  const destinationAddress = useSelector(state => state.destination.address);
  const destinationRegion = useSelector(state => state.destination.region);
  const destinationDistance = useSelector(state => state.destination.distance);
  const destinationPhotoURL = useSelector(state => state.destination.photoURL);
  const isGuideStart = useSelector(state => state.destination.isGuideStart);

  const isBottomSheetOpen = useSelector(state => state.bottomSheet.isBottomSheetOpen);
  const bottomSheefRef = useRef(null);

  useEffect(() => {
    updateBottomSheetStatus();
  }, [isBottomSheetOpen]);

  const updateBottomSheetStatus = () => {
    if (isBottomSheetOpen) return bottomSheefRef.current.snapTo(0);

    bottomSheefRef.current.snapTo(1);
  };

  const handlePressGuideButton = async () => {
    if (isGuideStart) return dispatch(endGuide());

    const currentAddress = await GeocodeAPI(currentRegion.latitude, currentRegion.longitude);
    const { routes, conformedRoutes, conformedBearings } = await DirectionsAPI(currentRegion, currentAddress, destinationRegion, destinationAddress);

    dispatch(startGuide({ routes, conformedRoutes, conformedBearings }));
    dispatch(closeBottomSheet());
  };

  const renderContent = () => {
    return (
      <View style={styles.container}>
        {destinationPhotoURL && <Image source={{ uri: destinationPhotoURL }} style={styles.imageContainer} />}
        <View style={styles.contentContainer}>
          <View style={styles.infoTextContatiner}>
            <Text style={styles.infoText}>{destinationAddress}</Text>
            <Text style={styles.infoText}>{destinationDistance}</Text>
          </View>
          <View>
            {!isGuideStart ? (
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

  return (
    <BottomSheet
      ref={bottomSheefRef}
      renderContent={renderContent}
      snapPoints={[Dimensions.get("screen").height * 0.6, 0]}
      initialSnap={1}
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
