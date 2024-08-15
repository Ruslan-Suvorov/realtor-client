export const getDate = (time) => {
  const date = new Date(time);
  const months = [
    "jun",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  const year = date.getFullYear().toString();
  const month = months[date.getMonth()];
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}, ${month} ${day}, ${hours}:${minutes}`;
};
