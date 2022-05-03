const express = require("express");
const route = express.Router();
const controller = require("../controller/user.controller");

route.get("/", (req, res) => {
  res.send("Welcome");
});

route.post("/register", controller.register);
route.post("/login", controller.login);
route.get("/profile", controller.profile);

module.exports = route;
