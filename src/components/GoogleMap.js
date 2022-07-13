import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";

import MapView, { Marker, Polyline } from "react-native-maps";
import GeoLocation from "react-native-geolocation-service";
import GeoLocationAPI from "../api/GeoLocationAPI";

import ARRouter from "../navigation/arRouter";

import { accelerometer, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";

import { useDispatch, useSelector } from "react-redux";
import { updateNearStatus } from "../store/slices/destinationSlice";
import { updateSheetState } from "../store/slices/bottomSheetSlice";

import { getDistance } from "../utils/utils";

import { LogBox } from "react-native";

export default function GoogleMap() {
  const [tilt, setTilt] = useState(0);
  const [isMarkerPressed, setIsMarkerPressed] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.497,
    longitude: 127.0254,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const dispatch = useDispatch();

  const currentRegion = useSelector(state => state.user.currentRegion);
  const destination = useSelector(state => state.destination.destination);
  const isBottomSheetOpen = useSelector(state => state.bottomSheet.isBottomSheetOpen);

  useEffect(() => {
    LogBox.ignoreLogs(["new NativeEventEmitter"]);

    setUpdateIntervalForType(SensorTypes.accelerometer, 1000);

    const watchId = GeoLocationAPI(dispatch, setMapRegion);

    return () => {
      GeoLocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    const subscription = accelerometer.subscribe(({ y }) => {
      if (Math.abs(tilt - y) > 7) {
        setTilt(y);

        subscription.unsubscribe();
      }
    });
  }, [tilt]);

  useEffect(() => {
    if (destination.points.length !== 0) {
      const curreRegion = { latitude: currentRegion.latitude, longitude: currentRegion.longitude };

      const distance = getDistance(curreRegion, destination.points[1]);

      if (distance < 3) dispatch(updateNearStatus());
    }
  }, [currentRegion]);

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

  const handleDragMap = reg => setMapRegion(reg);

  return (
    <>
      {tilt > 7 && destination.isGuideStart === true ? (
        <ARRouter />
      ) : (
        <MapView
          style={isBottomSheetOpen ? styles.sheetOpenMap : tilt > 7 && destination.isGuideStart ? styles.arOpenMap : styles.map}
          region={isMarkerPressed ? destination.region : mapRegion}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onRegionChangeComplete={reg => handleDragMap(reg)}
          onPress={() => handlePressMapView()}
        >
          {destination.photoURL !== "" && <Marker coordinate={destination.region} onPress={() => handlePressMarker()} />}
          {destination.isGuideStart && <Polyline coordinates={[...destination.points]} strokeColor="pink" strokeWidth={6} />}
        </MapView>
      )}
    </>
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
