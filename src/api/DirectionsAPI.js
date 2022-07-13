import axios from "axios";
import Config from "react-native-config";

import { getAngle } from "../utils/utils";

export default async function DirectionsAPI(currentRegion, currentPlaceName, destination) {
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

    const steps = response.data.features;

    const points = [];
    const routes = [];
    const bearings = [];

    steps.forEach(step => {
      if (step.geometry.type === "Point") {
        points.push({ latitude: step.geometry.coordinates[1], longitude: step.geometry.coordinates[0] });
        return;
      }

      step.geometry.coordinates.forEach(coordinate => {
        routes.push({ latitude: coordinate[1], longitude: coordinate[0] });
      });
    });

    for (let i = 0; i < points.length; i++) {
      if (i < points.length - 1) {
        bearings.push(getAngle(points[i], points[i + 1]));
      }
    }

    return { points, routes, bearings };
  } catch (error) {
    console.log(error);
  }
}
