export const cleanObject = (obj) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const cleaned = cleanObject(value);
      if (Object.keys(cleaned).length > 0) {
        acc[key] = cleaned;
      }
    } else if (value !== null && value !== undefined && value !== "") {
      acc[key] = value;
    }

    return acc;
  }, {});
};
