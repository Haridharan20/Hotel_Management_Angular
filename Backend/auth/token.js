const jwt = require("jsonwebtoken");

const generateToken = (email) => {
  const token = jwt.sign({ email }, "hotel_management", {
    expiresIn: "180s",
  });
  return token;
};

const tokenValidator = async (token) => {
  try {
    const data = await jwt.verify(token, "hotel_management");
    console.log("data", data);
    return data;
  } catch (err) {
    return false;
  }
};

module.exports = {
  generateToken,
  tokenValidator,
};
