export const isEquals = (x, y) => {
  console.log("(x && y) >>", !(x && y), x, y);

  const typeOfX = typeof x;
  const typeOfY = typeof y;

  if (!typeOfX === typeOfY) {
    return false;
  }

  if (x && y && typeOfX === "object") {
    if (Array.isArray(x) && Array.isArray(y)) {
      if (x.length === y.length) {
        const sortedX = structuredClone(x).sort();
        const sortedY = structuredClone(y).sort();
        return sortedX.every((key) => isEquals(sortedX[key], sortedY[key]));
      }
      return false;
    } else {
      // console.log("obj compare");
      return (
        Object.keys(x).length === Object.keys(y).length &&
        Object.keys(x).every((key) => isEquals(x[key], y[key]))
      );
    }
  }
  return x === y;
};
