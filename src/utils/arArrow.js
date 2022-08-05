export const getArrowByCompassHeading = (compassHeading, nextBearing) => {
  if (Math.abs(compassHeading - nextBearing) < 30 || Math.abs(compassHeading - nextBearing) > 330) return "straight";

  if (Math.abs(compassHeading - nextBearing) > 160 && Math.abs(compassHeading - nextBearing) < 190) return "back";

  if (nextBearing <= 90) {
    if (compassHeading > 180) return "right";

    return "left";
  } else if (nextBearing > 90 && nextBearing <= 180) {
    if (compassHeading < nextBearing) return "right";

    return "left";
  } else if (180 < nextBearing && nextBearing <= 270) {
    if (compassHeading < nextBearing) return "right";

    return "left";
  } else {
    if (compassHeading < nextBearing - 180) return "left";

    return "right";
  }
};

export const getArrowByBearing = (prevBearing, nextBearing) => {
  if (Math.abs(prevBearing - nextBearing) < 30 || Math.abs(prevBearing - nextBearing) > 330) return "straight";

  if (Math.abs(prevBearing - nextBearing) > 160 && Math.abs(prevBearing - nextBearing) < 190) return "back";

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
  let rotation = null;

  switch (arrow) {
    case "straight":
      rotation = [0, 80, 90];
      break;
    case "back":
      rotation = [0, -80, 0];
      break;
    case "left":
      rotation = [0, 0, 180];
      break;
    case "right":
      rotation = [0, 0, 0];
      break;
  }

  return rotation;
};
