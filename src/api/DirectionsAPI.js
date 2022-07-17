import axios from "axios";
import Config from "react-native-config";

import { getBearing, getRoutesFromSteps, getBearingsFromRoutes, modifySimilarBearingsToSame, deleteUselessPoint } from "../utils/utils";

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

    const routes = [];
    const bearings = [];

    getRoutesFromSteps(steps, routes);

    getBearingsFromRoutes(routes, bearings);

    modifySimilarBearingsToSame(bearings);

    deleteUselessPoint(routes, bearings);

    return { routes, bearings };
  } catch (error) {
    console.log(error);
  }
}
