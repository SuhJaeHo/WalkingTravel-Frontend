import axios from "axios";
import Config from "react-native-config";

export default async function GeocodeAPI(latitude, longitude) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?language=ko&latlng=${latitude}%2C${longitude}&key=${Config.GOOGLE_API_KEY}`
    );

    const address = response.data.results[0].formatted_address;

    return address;
  } catch (error) {
    console.log(error);
  }
}
