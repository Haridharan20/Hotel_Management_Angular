const jwt = require("jsonwebtoken");

const tokenGenerator = (email) => {
  const token = jwt.sign({ email }, "Hotel", { expiresIn: "120s" });
  return token;
};

module.exports = {
  tokenGenerator,
};
