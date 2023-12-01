import { difference, union } from "lodash";

export const booleanArrayUpdate = (
  type: "add" | "remove",
  array: string[],
  value: string[]
): string[] => {
  if (type === "add") {
    return union(array, value);
  } else {
    return difference(array, value);
  }
};
