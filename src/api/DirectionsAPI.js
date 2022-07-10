import axios from "axios";
import Config from "react-native-config";

export default async function DirectionsAPI(
  currentRegion,
  currentPlaceName,
  destination
) {
  try {
    const response = await axios.post(
      "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1",
      {
        startX: currentRegion.longitude,
        startY: currentRegion.latitude,
        endX: destination.region.longitude,
        endY: destination.region.latitude,
        startName: currentPlaceName,
        endName: destination.placeName,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          appKey: `${Config.TMAP_APP_KEY}`,
        },
      }
    );

    const points = [];
    const routes = [];

    const steps = response.data.features;
    console.log(steps);

    steps.forEach(step => {
      console.log(step.geometry.coordinates);

      if (step.geometry.type === "Point") {
        points.push({
          latitude: step.geometry.coordinates[1],
          longitude: step.geometry.coordinates[0],
        });
      } else {
        step.geometry.coordinates.forEach(coordinate => {
          routes.push({
            latitude: coordinate[1],
            longitude: coordinate[0],
          });
        });
      }
    });

    return { points, routes };
  } catch (error) {
    console.log(error);
  }
}
