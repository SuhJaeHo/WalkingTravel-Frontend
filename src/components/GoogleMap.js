import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Dimensions } from "react-native";

import MapView, { Marker, Polyline } from "react-native-maps";
import GeoLocation from "react-native-geolocation-service";
import GeoLocationAPI from "../api/GeoLocationAPI";

import ARRouter from "../navigation/arRouter";

import { accelerometer, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";

import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPointIndex } from "../store/slices/destinationSlice";
import { updateSheetState } from "../store/slices/bottomSheetSlice";

import { getNearPointIndex, getBearingFromNearPoint, getBearingFromBeforeRegion } from "../utils/utils";

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

  const beforeRegion = useSelector(state => state.user.beforeRegion);
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
      if (y > 0) {
        if (Math.abs(tilt - y) > 7) {
          setTilt(y);

          subscription.unsubscribe();
        }
      }
    });
  }, [tilt]);

  useEffect(() => {
    if (destination.routes.length !== 0) {
      const nearPointIndex = getNearPointIndex({ latitude: currentRegion.latitude, longitude: currentRegion.longitude }, destination.routes);

      const nearPointRegion = destination.routes[nearPointIndex];

      const bearingFromNearPoint = getBearingFromNearPoint(nearPointRegion, currentRegion);

      const nearPointBearing = destination.bearings[nearPointIndex];

      const bearingFromBeforeRegion = getBearingFromBeforeRegion(beforeRegion, currentRegion);

      if (nearPointIndex !== 0) {
        if (
          Math.abs(nearPointBearing - bearingFromNearPoint) < 60 ||
          isNaN(Math.abs(nearPointBearing - bearingFromNearPoint)) ||
          Math.abs(bearingFromBeforeRegion - destination.routes[nearPointIndex]) -
            Math.abs(bearingFromBeforeRegion - destination.routes[nearPointIndex - 1]) <
            0
        ) {
          dispatch(updateCurrentPointIndex(nearPointIndex));
        } else {
          dispatch(updateCurrentPointIndex(nearPointIndex - 1));
        }
      } else {
        dispatch(updateCurrentPointIndex(nearPointIndex));
      }
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
        <>
          <ARRouter />
          <MapView style={styles.arOpenMap} region={currentRegion} showsUserLocation={true} showsMyLocationButton={true}>
            {destination.photoURL !== "" && <Marker coordinate={destination.region} onPress={() => handlePressMarker()} />}
            {destination.isGuideStart && (
              <Polyline coordinates={[...destination.routes]} strokeColor="blue" strokeWidth={6} lineDashPattern={[2, 2]} />
            )}
          </MapView>
        </>
      ) : (
        <MapView
          style={isBottomSheetOpen ? styles.sheetOpenMap : styles.map}
          region={isMarkerPressed ? destination.region : mapRegion}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onRegionChangeComplete={reg => handleDragMap(reg)}
          onPress={() => handlePressMapView()}
        >
          {destination.photoURL !== "" && <Marker coordinate={destination.region} onPress={() => handlePressMarker()} />}
          {destination.isGuideStart && <Polyline coordinates={[...destination.routes]} strokeColor="blue" strokeWidth={6} lineDashPattern={[2, 2]} />}
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
  arOpenMap: {
    width: Dimensions.get("screen").width * 1,
    height: Dimensions.get("screen").height * 0.3,
    position: "absolute",
    top: Dimensions.get("screen").height * 0.65,
  },
});
