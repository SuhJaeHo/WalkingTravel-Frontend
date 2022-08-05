export const getKilometersFromMeters = distanceOfMeter => {
  const distanceOfKilometer = Math.floor(distanceOfMeter / 1000);

  if (distanceOfKilometer < 1) return distanceOfMeter + "m";

  return distanceOfKilometer + Math.round((distanceOfMeter % 1000) / 1000) + "km";
};

export const getDistance = (prevPoint, nextPoint) => {
  const PI = Math.PI;
  const R = 6371;

  const lat1 = prevPoint.latitude * (PI / 180);
  const lat2 = nextPoint.latitude * (PI / 180);

  const lng1 = prevPoint.longitude * (PI / 180);
  const lng2 = nextPoint.longitude * (PI / 180);

  const distance = R * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2)) * 1000;

  return distance;
};
