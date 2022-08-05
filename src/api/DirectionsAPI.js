import axios from "axios";
import Config from "react-native-config";

import {
  getBearingByRegions,
  getBearingsFromRoutes,
  getUnneccessaryRoute,
  removeUnneccessaryRoute,
  checkNextIndexIsNotEmpty,
} from "../utils/destinationRoutes";

import { getDistance } from "../utils/distance";

export default async function DirectionsAPI(currentRegion, currentAddress, destinationRegion, destinationAddress) {
  try {
    const response = await axios.post(
      "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1",
      {
        startX: currentRegion.longitude,
        startY: currentRegion.latitude,
        endX: destinationRegion.longitude,
        endY: destinationRegion.latitude,
        startName: currentAddress,
        endName: destinationAddress,
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

    steps.forEach(step => {
      if (step.geometry.type === "Point") return;

      step.geometry.coordinates.forEach((coordinate, index, coordinates) => {
        if (coordinate === coordinates[0]) {
          routes.push({ latitude: coordinate[1], longitude: coordinate[0] });
        } else {
          if (index !== 0) routes.push({ latitude: coordinate[1], longitude: coordinate[0] });
        }
      });
    });

    const bearings = getBearingsFromRoutes(routes, getBearingByRegions, checkNextIndexIsNotEmpty);

    const { conformedRoutes, conformedBearings } = getUnneccessaryRoute(routes, bearings, removeUnneccessaryRoute, getDistance);

    return { routes, conformedRoutes, conformedBearings };
  } catch (error) {
    console.log(error);
  }
}
