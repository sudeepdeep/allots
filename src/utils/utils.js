export const dateConverter = (createdAt) => {
  const date = new Date(createdAt);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};
