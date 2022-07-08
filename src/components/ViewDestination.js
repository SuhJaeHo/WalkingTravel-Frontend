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

import { useSelector } from "react-redux";

export default function ViewDestination() {
  const destination = useSelector(state => state.destination.destination);
  const isBottomSheetOpen = useSelector(state => state.sheet.isBottomSheetOpen);

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
        <Pressable style={styles.startBtn}>
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
