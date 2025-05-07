const checkNullish = (value) => {
  if (value === null || value === undefined || value < 0 || value === "")
    return null;
  else return value;
};

module.exports = { checkNullish };
