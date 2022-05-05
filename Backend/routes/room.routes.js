const express = require("express");
const router = express.Router();
const roomController = require("../controller/room.controller");
router.post("/add", roomController.addRoom);
router.get("/getRooms/:id", roomController.getRooms);

module.exports = router;
