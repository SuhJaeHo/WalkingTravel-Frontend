import React, { useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";

import MapView, { Marker } from "react-native-maps";
import GeoLocation from "react-native-geolocation-service";
import GeoLocationAPI from "../api/GeoLocationAPI";

import { useDispatch, useSelector } from "react-redux";

export default function GoogleMap({ params }) {
  const dispatch = useDispatch();

  const currentPosition = useSelector(state => state.user.currentPosition);
  const destination = useSelector(state => state.destination.destination);

  useEffect(() => {
    const watchId = GeoLocationAPI(dispatch);

    return () => {
      GeoLocation.clearWatch(watchId);
    };
  }, []);

  return (
    <MapView
      style={styles.map}
      region={params ? destination.region : currentPosition}
      showsUserLocation={true}
      showsMyLocationButton={true}
    >
      {destination.photoURL !== "" && (
        <Marker coordinate={destination.region} />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("screen").width * 1,
    height: Dimensions.get("screen").height * 1,
  },
});
