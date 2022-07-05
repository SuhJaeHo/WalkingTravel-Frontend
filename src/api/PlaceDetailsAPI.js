import axios from "axios";
import Config from "react-native-config";

export default async function PlaceDetailsAPI(placeId) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&language=ko&key=${Config.GOOGLE_API_KEY}`
    );

    const { lat, lng } = response.data.result.geometry.location;

    const region = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    };

    const photoURL = `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${response.data.result.photos[0].photo_reference}&key=${Config.GOOGLE_API_KEY}`;

    return { message: "success", region, photoURL };
  } catch (error) {
    console.log(error);
    return { message: "fail" };
  }
}
