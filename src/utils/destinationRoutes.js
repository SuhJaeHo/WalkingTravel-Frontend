export const getBearingByRegions = (prevPoint, nextPoint) => {
  const PI = Math.PI;

  const lat1 = prevPoint.latitude * (PI / 180);
  const lat2 = nextPoint.latitude * (PI / 180);

  const lng1 = prevPoint.longitude * (PI / 180);
  const lng2 = nextPoint.longitude * (PI / 180);

  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1);
  const y = Math.sin(lng2 - lng1) * Math.cos(lat2);

  const angle = Math.atan2(y, x);
  const bearing = ((angle * 180) / PI + 360) % 360;

  return bearing;
};

export const getBearingsFromRoutes = (routes, getBearingByRegions, checkNextIndexIsNotEmpty) => {
  const conformedRoutes = routes.filter((route, index, routes) => checkNextIndexIsNotEmpty(index, routes));

  return conformedRoutes.map((route, index) => getBearingByRegions(route, routes[index + 1]));
};

export const getUnneccessaryRoute = (routes, bearings, removeUnneccessaryRoute, getDistance) => {
  const removeRouteIndexArray = [];

  const conformedRoutes = routes.filter((route, index, routes) => checkNextIndexIsNotEmpty(index, routes));

  conformedRoutes.forEach((route, index) => {
    if (isUnneccessaryRoute(route, index, routes, bearings, getDistance)) removeRouteIndexArray.push(index + 1);
  });

  return removeUnneccessaryRoute(routes, bearings, removeRouteIndexArray);
};

export const checkNextIndexIsNotEmpty = (index, routes) => {
  if (routes[index + 1]) return true;
};

export const isUnneccessaryRoute = (route, index, routes, bearings, getDistance) => {
  const distanceToNextPoint = getDistance(route, routes[index + 1]);
  const bearingGap = Math.abs(bearings[index] - bearings[index + 1]);

  if (distanceToNextPoint < 20 && (bearingGap > 330 || bearingGap < 30)) return true;
};

export const removeUnneccessaryRoute = (routes, bearings, removeIndexArray) => {
  const conformedRoutes = routes.filter((route, index) => checkIsNotRemoveIndex(removeIndexArray, index));
  const conformedBearings = bearings.filter((route, index) => checkIsNotRemoveIndex(removeIndexArray, index));

  return { conformedRoutes, conformedBearings };
};

export const checkIsNotRemoveIndex = (removeIndexArray, index) => {
  if (!removeIndexArray.includes(index)) return true;
};
