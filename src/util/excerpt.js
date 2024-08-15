export const excerpt = (str) => {
  if (str.length > 45) {
    str = str.substring(45, 0) + " ...";
  }
  return str;
};
