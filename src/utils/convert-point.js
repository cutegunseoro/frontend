function convertPointToLatLng(pointString) {
  if (!pointString || !pointString.startsWith("POINT(") || !pointString.endsWith(")")) {
      throw new Error("Invalid POINT format");
  }

  // Extract the numbers inside the parentheses
  const coordinates = pointString.slice(6, -1).split(" ");
  if (coordinates.length !== 2) {
      throw new Error("Invalid coordinate format");
  }

  const lng = parseFloat(coordinates[0]);
  const lat = parseFloat(coordinates[1]);

  if (isNaN(lat) || isNaN(lng)) {
      throw new Error("Coordinates must be valid numbers");
  }

  return { lat, lng };
}

export {convertPointToLatLng}
