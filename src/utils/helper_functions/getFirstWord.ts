const getFirstWord = (string: string) => {
  const words = string.split(/[, ]+/);
  return words[0];
};

export { getFirstWord };
