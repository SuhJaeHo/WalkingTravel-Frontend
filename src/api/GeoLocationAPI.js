import GeoLocation from "react-native-geolocation-service";
import { PermissionsAndroid } from "react-native";

import GeocodeAPI from "./GeocodeAPI";

import { updateCurrentPoint } from "../store/slices/userSlice";

export default function GeoLocationAPI(dispatch, updateMapRegion) {
  const getCurrentLocation = () => {
    let currentPosition = null;

    GeoLocation.getCurrentPosition(
      async position => {
        currentPosition = position;

        const placeName = await GeocodeAPI(position.coords.latitude, position.coords.longitude);

        updateMapRegion({ latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: 0.015, longitudeDelta: 0.0121 });

        dispatch(
          updateCurrentPoint({
            currentRegion: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            },
            placeName,
          })
        );
      },
      error => {
        if (error.code === 1) {
          requestLocationPermission();
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

    return GeoLocation.watchPosition(
      async position => {
        if (currentPosition && currentPosition.coords.latitude !== position.coords.latitude) {
          const placeName = await GeocodeAPI(position.coords.latitude, position.coords.longitude);

          dispatch(
            updateCurrentPoint({
              currentRegion: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              },
              placeName,
            })
          );
        }
      },
      error => {
        if (error.code === 1) {
          requestLocationPermission();
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 3,
      }
    );
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: "Get MyLocation Permission",
        message: "Needs to access your current location",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      });

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.log("Location permission denied");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return getCurrentLocation();
}
