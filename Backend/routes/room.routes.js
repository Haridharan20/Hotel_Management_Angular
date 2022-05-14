const express = require("express");
const router = express.Router();
const roomController = require("../controller/room.controller");
router.post("/add", roomController.addRoom);
router.put("/updateBooking", roomController.updateBooking);
router.get("/getRooms/:id", roomController.getRooms);
router.get("/getRoom/:id", roomController.getRoom);

module.exports = router;
