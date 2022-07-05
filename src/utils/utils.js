export const getKilometers = meters => {
  const kmValue = Math.floor(meters / 1000);

  if (kmValue < 1) {
    return meters + "m";
  }

  return kmValue + Math.round((meters % 1000) / 1000) + "km";
};
