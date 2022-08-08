import {
  getBearingsFromRoutes,
  getBearingByRegions,
  checkNextIndexIsNotEmpty,
  getConformedRoutes,
  isUnneccessaryRoute,
  getUnneccessaryRouteIndexArray,
} from "../src/utils/destinationRoutes";

import { getDistance } from "../src/utils/distance";
import { getNearRouteIndex } from "../src/utils/getNearRoute";
import { getArrowByBearing } from "../src/utils/arArrow";

const bearings = getBearingsFromRoutes(routes, getBearingByRegions, checkNextIndexIsNotEmpty);

test("get unneccssary route index array", () => {
  const unNeccessaryRouteIndexArray = getUnneccessaryRouteIndexArray(routes, bearings, getDistance);
  expect(unNeccessaryRouteIndexArray).toEqual([1]);
});

test("check unneccessary route", () => {
  expect(isUnneccessaryRoute(routes[0], 0, routes, bearings, getDistance)).toBeTruthy();
});

test("remove unneccessary route", () => {
  const { conformedRoutes } = getConformedRoutes(routes, bearings, [1]);

  expect(routes).toEqual([
    { latitude: 37.515455, longitude: 127.102593 },
    { latitude: 37.515384, longitude: 127.102613 },
    { latitude: 37.514414, longitude: 127.103089 },
    { latitude: 37.513498, longitude: 127.100227 },
    { latitude: 37.511228, longitude: 127.101867 },
  ]);

  expect(conformedRoutes).toEqual([
    { latitude: 37.515455, longitude: 127.102593 },
    { latitude: 37.514414, longitude: 127.103089 },
    { latitude: 37.513498, longitude: 127.100227 },
    { latitude: 37.511228, longitude: 127.101867 },
  ]);
});

test("get near route index by user's current region", () => {
  const nearRouteIndex = getNearRouteIndex(currentRegion, routes);

  expect(nearRouteIndex).toBe(2);
});

test("get arrow by adjacent bearings", () => {
  const arrow1 = getArrowByBearing(bearings[0], bearings[1]);
  const arrow2 = getArrowByBearing(bearings[1], bearings[2]);
  const arrow3 = getArrowByBearing(bearings[2], bearings[3]);

  expect(arrow1).toBe("straight");
  expect(arrow2).toBe("right");
  expect(arrow3).toBe("left");
});
