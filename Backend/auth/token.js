const jwt = require("jsonwebtoken");

const generateAccessToken = (email) => {
  const token = jwt.sign({ email }, "hotel_management", {
    expiresIn: "15s",
  });
  return token;
};

const generateRefreshToken = (email) => {
  const token = jwt.sign({ email }, "refresh", {
    expiresIn: "15m",
  });
  return token;
};

const tokenValidator = async (token, secret) => {
  try {
    console.log(secret);
    const data = await jwt.verify(token, secret);
    console.log("data", data);
    return data;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      console.log("Token expire");
      return false;
    }
    // console.log("error secret", err);
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  tokenValidator,
};
