import GeoLocation from "react-native-geolocation-service";
import { PermissionsAndroid } from "react-native";

import { updateRegion } from "../store/slices/regionSlice";

export default function GeoLocationAPI(dispatch) {
  const getCurrentLocation = () => {
    let currentPosition = null;

    GeoLocation.getCurrentPosition(
      position => {
        currentPosition = position;

        dispatch(
          updateRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
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
      position => {
        if (currentPosition.coords.latitude !== position.coords.latitude) {
          dispatch(
            updateRegion({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            })
          );
        }
      },
      error => {
        if (error.code === 1) {
          requestLocationPermission();
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 30 }
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
