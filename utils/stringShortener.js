export default (date, length = 5) => {
  return `${date.slice(0, length)}...${date.slice(
    date.length - length,
    date.length
  )}`;
};
