const dateToSQLFormat = (value) => {
  const [date, time] = new Date(value).toLocaleString("es").split(", ");
  const [d, m, y] = date.split("/");
  return `${y}-${m}-${d} ${time}`;
};

module.exports = { dateToSQLFormat };
