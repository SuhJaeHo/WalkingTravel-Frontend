export const getKilometers = meters => {
  const kmValue = Math.floor(meters / 1000);

  if (kmValue < 1) return meters + "m";

  return kmValue + Math.round((meters % 1000) / 1000) + "km";
};

export const getBearing = (prevPoint, nextPoint) => {
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

export const getNearPointIndex = (currRegion, routes) => {
  let minimumDistance = 10000;
  let nearPointIndex = null;

  const PI = Math.PI;
  const R = 6371;

  const lat1 = currRegion.latitude * (PI / 180);
  const lng1 = currRegion.longitude * (PI / 180);

  routes.forEach((route, index) => {
    const lat2 = route.latitude * (PI / 180);
    const lng2 = route.longitude * (PI / 180);

    const distance = Math.round(R * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2)) * 1000);

    if (minimumDistance > distance) {
      minimumDistance = distance;
      nearPointIndex = index;
    }
  });

  return nearPointIndex;
};

export const getBearingFromNearPoint = (nearPoint, currentRegion) => {
  return getBearing(nearPoint, currentRegion);
};

export const getBearingFromBeforeRegion = (beforeRegion, currentRegion) => {
  return getBearing(beforeRegion, currentRegion);
};

export const getArrow = (prevBearing, nextBearing) => {
  if (Math.abs(prevBearing - nextBearing) < 20) return "straight";

  if (Math.abs(prevBearing - nextBearing) > 170 && Math.abs(prevBearing - nextBearing) < 190) return "back";

  if (nextBearing <= 90) {
    if (prevBearing >= nextBearing + 180 || prevBearing < nextBearing) return "right";

    return "left";
  } else if (nextBearing > 90 && nextBearing <= 180) {
    if (prevBearing < nextBearing + 180 && prevBearing > nextBearing) return "left";

    return "right";
  } else if (nextBearing > 180 && nextBearing <= 270) {
    if (prevBearing > nextBearing - 180 && prevBearing < nextBearing) return "right";

    return "left";
  } else {
    if (prevBearing > nextBearing - 180 && prevBearing < nextBearing) return "right";

    return "left";
  }
};

export const getRotation = arrow => {
  if (arrow === "straight") return [0, 80, 90];

  if (arrow === "back") return [0, -80, 0];

  if (arrow === "left") return [0, 0, 180];

  if (arrow === "right") return [0, 0, 0];
};

export const getRoutesFromSteps = (steps, routes) => {
  steps.forEach(step => {
    if (step.geometry.type === "Point") return;

    step.geometry.coordinates.forEach((coordinate, index) => {
      if (routes.length === 0) {
        routes.push({ latitude: coordinate[1], longitude: coordinate[0] });
      } else {
        if (index !== 0) routes.push({ latitude: coordinate[1], longitude: coordinate[0] });
      }
    });
  });
};

export const getBearingsFromRoutes = (routes, bearings) => {
  for (let i = 0; i < routes.length; i++) {
    if (i < routes.length - 1) bearings.push(getBearing(routes[i], routes[i + 1]));
  }
};

export const modifySimilarBearingsToSame = bearings => {
  for (let i = 0; i < bearings.length; i++) {
    if (i < bearings.length - 1) {
      if (Math.abs(bearings[i] - bearings[i + 1]) < 30) {
        bearings[i + 1] = bearings[i];
      }
    }
  }
};

export const deleteUselessPoint = (routes, bearings) => {
  const deleteIndex = [];
  let tempDeleteIndex = [];
  let straightPointCount = 0;

  for (let i = 0; i < routes.length; i++) {
    if (i < routes.length - 1) {
      if (getDistance(routes[i], routes[i + 1]) < 50 && Math.abs(bearings[i] - bearings[i + 1]) === 0) {
        tempDeleteIndex.push(i + 1);
        straightPointCount++;
      } else {
        if (straightPointCount > 1) {
          tempDeleteIndex.pop();

          tempDeleteIndex.forEach(index => {
            deleteIndex.push(index);
          });
        }

        tempDeleteIndex = [];
        straightPointCount = 0;
      }
    }
  }

  let deletedCount = 0;

  deleteIndex.forEach(index => {
    routes.splice(index - deletedCount, 1);
    bearings.splice(index - deletedCount, 1);

    deletedCount++;
  });
};
