import GeoLocation from "react-native-geolocation-service";
import { trackCurrentRegion } from "../store/slices/userSlice";

export default function GeoLocationAPI(dispatch, updateMapRegion) {
  let currentPosition = null;

  GeoLocation.getCurrentPosition(
    async position => {
      currentPosition = position;
      updateMapRegion({ latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: 0.015, longitudeDelta: 0.0121 });

      dispatch(
        trackCurrentRegion({
          currentRegion: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.001,
          },
        })
      );
    },
    error => {
      console.log(error);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
  );

  return GeoLocation.watchPosition(
    async position => {
      if (currentPosition && currentPosition.coords.latitude !== position.coords.latitude) {
        dispatch(
          trackCurrentRegion({
            currentRegion: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.002,
              longitudeDelta: 0.001,
            },
          })
        );
      }
    },
    error => {
      console.log(error);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 0, distanceFilter: 1 }
  );
}
