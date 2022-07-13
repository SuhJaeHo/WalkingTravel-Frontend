export const getKilometers = meters => {
  const kmValue = Math.floor(meters / 1000);

  if (kmValue < 1) return meters + "m";

  return kmValue + Math.round((meters % 1000) / 1000) + "km";
};

export const getAngle = (prevPoint, nextPoint) => {
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

export const getDistance = (currRegion, nextRegion) => {
  const PI = Math.PI;
  const R = 6371;

  const lat1 = currRegion.latitude * (PI / 180);
  const lat2 = nextRegion.latitude * (PI / 180);

  const lng1 = currRegion.longitude * (PI / 180);
  const lng2 = nextRegion.longitude * (PI / 180);

  const distance = R * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2)) * 1000;

  return distance;
};

export const getArrow = (compassHeading, bearing) => {
  if (Math.abs(compassHeading - bearing) < 20) return "straight";

  if (Math.abs(compassHeading - bearing) > 170 && Math.abs(compassHeading - bearing) < 190) return "back";

  if (bearing <= 90) {
    if (compassHeading >= bearing + 180 || compassHeading < bearing) return "right";

    return "left";
  } else if (bearing > 90 && bearing <= 180) {
    if (compassHeading < bearing + 180 && compassHeading > bearing) return "left";

    return "right";
  } else if (bearing > 180 && bearing <= 270) {
    if (compassHeading > bearing - 180 && compassHeading < bearing) return "right";

    return "left";
  } else {
    if (compassHeading > bearing - 180 && compassHeading < bearing) return "right";

    return "left";
  }
};

export const getRotation = arrow => {
  if (arrow === "straight") return [0, 85, 0];

  if (arrow === "back") return [0, -80, 0];

  if (arrow === "left") return [0, 0, 180];

  if (arrow === "right") return [0, 0, 0];
};
