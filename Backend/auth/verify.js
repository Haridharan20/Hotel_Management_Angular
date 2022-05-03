const validator = require("./token");
const validate = async (req, res, next) => {
  console.log(req.headers.authorization);
  jtoken = req.headers.authorization.slice(4);
  try {
    const valid = await validator.tokenValidator(jtoken);
    console.log("v", valid);
    if (valid) {
      req.data = valid;
      next();
    } else {
      res.send("Access denied");
    }
  } catch (err) {
    res.send(err);
  }
};
module.exports = {
  validate,
};
