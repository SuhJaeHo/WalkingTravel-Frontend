import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";

import MapView, { Marker } from "react-native-maps";
import GeoLocation from "react-native-geolocation-service";
import GeoLocationAPI from "../api/GeoLocationAPI";

import ARRouter from "../navigation/arRouter";

import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from "react-native-sensors";

import { useDispatch, useSelector } from "react-redux";
import { updateSheetState } from "../store/slices/sheetSlice";

import { LogBox } from "react-native";

export default function GoogleMap({ params }) {
  const [tilt, setTilt] = useState(0);
  const [isMarkerPressed, setIsMarkerPressed] = useState(false);

  const dispatch = useDispatch();

  const currentPosition = useSelector(state => state.user.currentPosition);
  const destination = useSelector(state => state.destination.destination);
  const isBottomSheetOpen = useSelector(state => state.sheet.isBottomSheetOpen);

  useEffect(() => {
    LogBox.ignoreLogs(["new NativeEventEmitter"]);

    setUpdateIntervalForType(SensorTypes.accelerometer, 1000);

    const watchId = GeoLocationAPI(dispatch);

    return () => {
      GeoLocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    const subscription = accelerometer.subscribe(({ x, y, z }) => {
      if (Math.abs(tilt - y) > 8) {
        setTilt(y);

        subscription.unsubscribe();
      }
    });
  }, [tilt]);

  const handlePressMarker = () => {
    setIsMarkerPressed(true);
    dispatch(updateSheetState());
  };

  const handlePressMapView = () => {
    if (isBottomSheetOpen) {
      setIsMarkerPressed(false);
      dispatch(updateSheetState());
    }
  };

  return tilt > 8 ? (
    <ARRouter />
  ) : (
    <MapView
      style={isBottomSheetOpen ? styles.sheetOpenMap : styles.map}
      region={params || isMarkerPressed ? destination.region : currentPosition}
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
