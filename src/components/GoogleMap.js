import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";

import MapView, { Marker, Polyline } from "react-native-maps";
import GeoLocation from "react-native-geolocation-service";
import GeoLocationAPI from "../api/GeoLocationAPI";

import ARRouter from "../navigation/arRouter";

import { accelerometer, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";

import { useDispatch, useSelector } from "react-redux";
import { trackCompassHeading } from "../store/slices/userSlice";
import { updateCurrentRouteIndex } from "../store/slices/destinationSlice";
import { openBottomSheet, closeBottomSheet } from "../store/slices/bottomSheetSlice";

import { getDistance } from "../utils/distance";
import { getNearRouteIndex } from "../utils/getNearRoute";

import CompassHeading from "react-native-compass-heading";

import { LogBox } from "react-native";

export default function GoogleMap() {
  const [tilt, setTilt] = useState(0);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.497,
    longitude: 127.0254,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const dispatch = useDispatch();

  const currentRegion = useSelector(state => state.user.currentRegion);

  const destinationRegion = useSelector(state => state.destination.region);
  const destinationRoutes = useSelector(state => state.destination.routes);
  const destinationConformedRoutes = useSelector(state => state.destination.conformedRoutes);
  const currentRouteIndex = useSelector(state => state.destination.currentRouteIndex);
  const isGuideStart = useSelector(state => state.destination.isGuideStart);
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
    const compass = CompassHeading;
    let headingValue = null;

    const accelerometerSubscription = accelerometer.subscribe(({ y }) => {
      if (y > 0) {
        if (Math.abs(tilt - y) > 7) {
          setTilt(y);

          accelerometerSubscription.unsubscribe();
        }

        if (y > 7) {
          if (headingValue) dispatch(trackCompassHeading(headingValue));
        } else if (y > 2 && y < 7) {
          compass.stop();
        } else {
          const degree_update_rate = 3;

          compass.start(degree_update_rate, ({ heading }) => {
            headingValue = heading;
          });
        }
      }
    });
  }, [tilt]);

  useEffect(() => {
    if (isGuideStart) {
      const nearRouteIndex = getNearRouteIndex({ latitude: currentRegion.latitude, longitude: currentRegion.longitude }, destinationConformedRoutes);

      const distanceFromRouteToNextRoute = getDistance(destinationConformedRoutes[nearRouteIndex], destinationConformedRoutes[nearRouteIndex + 1]);
      const distanceFromCurrentRegionToNextRoute = getDistance(currentRegion, destinationConformedRoutes[nearRouteIndex + 1]);

      if (!nearRouteIndex) dispatch(updateCurrentRouteIndex(nearRouteIndex));

      if (nearRouteIndex && distanceFromRouteToNextRoute > distanceFromCurrentRegionToNextRoute) {
        if (currentRouteIndex !== nearRouteIndex) dispatch(updateCurrentRouteIndex(nearRouteIndex));
      }

      if (nearRouteIndex && distanceFromRouteToNextRoute < distanceFromCurrentRegionToNextRoute) {
        if (currentRouteIndex !== nearRouteIndex - 1) dispatch(updateCurrentRouteIndex(nearRouteIndex - 1));
      }
    }
  }, [isGuideStart]);

  useEffect(() => {
    if (Object.keys(destinationRegion).length) {
      setMapRegion({
        ...mapRegion,
        latitude: destinationRegion.latitude,
        longitude: destinationRegion.longitude,
      });
    }
  }, [destinationRegion]);

  const handlePressMarker = () => {
    setMapRegion({
      ...mapRegion,
      latitude: destinationRegion.latitude,
      longitude: destinationRegion.longitude,
    });

    if (!isBottomSheetOpen) dispatch(openBottomSheet());
  };

  const handlePressMapView = () => {
    isBottomSheetOpen ? dispatch(closeBottomSheet()) : dispatch(openBottomSheet());
  };

  const handleDragMap = (reg, gesture) => {
    if (gesture.isGesture) setMapRegion(reg);
  };

  return (
    <>
      {tilt > 7 && isGuideStart === true ? (
        <>
          <ARRouter />
          <MapView style={styles.arOpenMap} region={currentRegion} showsUserLocation={true} showsMyLocationButton={true}>
            <Marker coordinate={destinationRegion} />
            <Polyline coordinates={[...destinationRoutes]} strokeColor="blue" strokeWidth={6} lineDashPattern={[2, 2]} />
          </MapView>
        </>
      ) : (
        <MapView
          style={isBottomSheetOpen ? styles.sheetOpenMap : styles.map}
          region={mapRegion}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onRegionChangeComplete={(reg, gesture) => handleDragMap(reg, gesture)}
          onPress={() => handlePressMapView()}
        >
          {Object.keys(destinationRegion).length !== 0 && <Marker coordinate={destinationRegion} onPress={() => handlePressMarker()} />}
          {isGuideStart && <Polyline coordinates={[...destinationRoutes]} strokeColor="blue" strokeWidth={6} lineDashPattern={[2, 2]} />}
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
