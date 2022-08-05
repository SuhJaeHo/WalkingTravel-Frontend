export const getNearRouteIndex = (currentRegion, routes) => {
  const PI = Math.PI;
  const R = 6371;

  const lat1 = currentRegion.latitude * (PI / 180);
  const lng1 = currentRegion.longitude * (PI / 180);

  const distanceArray = routes.map((route, index) => {
    const lat2 = route.latitude * (PI / 180);
    const lng2 = route.longitude * (PI / 180);

    return Math.round(R * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2)) * 1000);
  });

  return distanceArray.indexOf(Math.min(...distanceArray));
};
