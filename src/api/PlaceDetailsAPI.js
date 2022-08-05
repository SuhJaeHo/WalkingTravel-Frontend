import axios from "axios";
import Config from "react-native-config";

export default async function PlaceDetailsAPI(id) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&language=ko&key=${Config.GOOGLE_API_KEY}`
    );

    const region = {
      latitude: response.data.result.geometry.location.lat,
      longitude: response.data.result.geometry.location.lng,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    };

    const photoURL = !response.data.result.photos
      ? null
      : `https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&maxWidth=1600&photo_reference=${response.data.result.photos[0].photo_reference}&key=${Config.GOOGLE_API_KEY}`;

    return { message: "success", region, photoURL };
  } catch (error) {
    console.log(error);
  }
}
