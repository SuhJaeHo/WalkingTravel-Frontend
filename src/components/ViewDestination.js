import React, { useEffect, useRef } from "react";
import { View, Text, Image, Dimensions } from "react-native";

import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

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
      <View
        style={{
          height: "100%",
          backgroundColor: "#fff",
        }}
      >
        {destination.photoURL && (
          <Image
            source={{ uri: destination.photoURL }}
            style={{
              width: "100%",
              height: "50%",
            }}
          />
        )}
        <Text>{destination.placeName}</Text>
        <Text>{destination.distance}</Text>
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
