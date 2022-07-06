import React, { useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";

import MapView, { Marker } from "react-native-maps";
import GeoLocation from "react-native-geolocation-service";
import GeoLocationAPI from "../api/GeoLocationAPI";

import { useDispatch, useSelector } from "react-redux";
import { updateSheetState } from "../store/slices/sheetSlice";

export default function GoogleMap({ params }) {
  const dispatch = useDispatch();

  const currentPosition = useSelector(state => state.user.currentPosition);
  const destination = useSelector(state => state.destination.destination);
  const isBottomSheetOpen = useSelector(state => state.sheet.isBottomSheetOpen);

  useEffect(() => {
    const watchId = GeoLocationAPI(dispatch);

    return () => {
      GeoLocation.clearWatch(watchId);
    };
  }, []);

  const handlePressMarker = () => {
    dispatch(updateSheetState());
  };

  const handlePressMapView = () => {
    if (isBottomSheetOpen) {
      dispatch(updateSheetState());
    }
  };

  return (
    <MapView
      style={isBottomSheetOpen ? styles.sheetOpenMap : styles.map}
      region={params ? destination.region : currentPosition}
      showsUserLocation={true}
      showsMyLocationButton={true}
      onPress={() => handlePressMapView()}
    >
      {destination.photoURL !== "" && (
        <Marker
          coordinate={destination.region}
          onPress={() => handlePressMarker()}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("screen").width * 1,
    height: Dimensions.get("screen").height * 1,
  },
  sheetOpenMap: {
    width: Dimensions.get("screen").width * 1,
    height: Dimensions.get("screen").height * 1,
    position: "absolute",
    bottom: Dimensions.get("screen").height * 0.2,
  },
});
