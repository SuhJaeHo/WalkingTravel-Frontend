import axios from "axios";
import Config from "react-native-config";

export default async function PlaceAutoCompleteAPI(text, currentPosition) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&language=ko&origin=${currentPosition.latitude}%2C${currentPosition.longitude}&key=${Config.GOOGLE_API_KEY}`
    );

    return response.data;
  } catch (error) {
    console.warn(error);
  }
}
