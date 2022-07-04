import React, { useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";

import MapView from "react-native-maps";
import GeoLocation from "react-native-geolocation-service";
import GeoLocationAPI from "../api/GeoLocationAPI";

import { useDispatch, useSelector } from "react-redux";

export default function GoogleMap() {
  const dispatch = useDispatch();
  const region = useSelector(state => state.region.region);

  useEffect(() => {
    const watchId = GeoLocationAPI(dispatch);

    return () => {
      GeoLocation.clearWatch(watchId);
    };
  }, []);

  return <MapView style={styles.map} region={region} showsUserLocation={true} showsMyLocationButton={true}></MapView>;
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("screen").width * 1,
    height: Dimensions.get("screen").height * 1,
  },
});
