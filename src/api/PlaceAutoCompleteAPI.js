import axios from "axios";
import Config from "react-native-config";

export default async function PlaceAutoCompleteAPI(text, currentRegion) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&language=ko&origin=${currentRegion.latitude}%2C${currentRegion.longitude}&key=${Config.GOOGLE_API_KEY}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
