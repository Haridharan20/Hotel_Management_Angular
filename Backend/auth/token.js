const jwt = require("jsonwebtoken");

const generateAccessToken = (email) => {
  const token = jwt.sign({ email }, "hotel_management", {
    expiresIn: "15s",
  });
  return token;
};

const generateRefreshToken = (email) => {
  const token = jwt.sign({ email }, "refresh", {
    expiresIn: "1m",
  });
  return token;
};

const tokenValidator = async (token, secret) => {
  try {
    const data = await jwt.verify(token, secret);
    console.log("data", data);
    return data;
  } catch (err) {
    return false;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  tokenValidator,
};
