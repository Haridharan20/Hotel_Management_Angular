const express = require("express");
const router = express.Router();
const hotelController = require("../controller/hotel.controller");

router.put("/addroom", hotelController.getHotelAndUpdateRoom);
router.post("/add", hotelController.add);
router.get("/hotels", hotelController.getHotels);
router.get("/hotelByCity", hotelController.HotelByCity);
router.get("/:id", hotelController.getHotel);
router.get("/getHotelByAdmin/:id", hotelController.getHotelByAdmin);

module.exports = router;
