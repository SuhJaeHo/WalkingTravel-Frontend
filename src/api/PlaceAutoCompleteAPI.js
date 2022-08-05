import axios from "axios";
import Config from "react-native-config";

export default async function PlaceAutoCompleteAPI(inputText, currentRegion) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputText}&language=ko&origin=${currentRegion.latitude}%2C${currentRegion.longitude}&key=${Config.GOOGLE_API_KEY}`
    );

    return { message: "success", data: response.data };
  } catch (error) {
    console.log(error);
  }
}
