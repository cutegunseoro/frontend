function removeTimeFromDate(dateString) {
  try {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10);
  } catch {
    return "";
  }
}

export { removeTimeFromDate }
