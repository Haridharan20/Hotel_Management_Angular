const validator = require("./token");
const validate = async (req, res, next) => {
  // console.log("auth", req.headers.authorization);
  try {
    jtoken = req.headers.authorization.slice(4);
    const valid = await validator.tokenValidator(jtoken, "hotel_management");
    console.log("v", valid);
    if (valid) {
      req.data = valid;
      next();
    } else {
      console.log("else");
      res.status(401).send("Access denied");
    }
  } catch (err) {
    console.log("send");
    res.send(err);
  }
};
module.exports = {
  validate,
};
