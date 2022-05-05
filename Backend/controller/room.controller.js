const RoomModel = require("../model/room.model");
const hotelController = require("../controller/hotel.controller");
const roomController = {
  addRoom: (req, res) => {
    const { hotel_id, roomtype, price, capacity, dates, images } = req.body;
    const model = RoomModel({
      hotel_id,
      roomtype,
      price,
      capacity,
      dates,
      images,
    });
    model
      .save()
      .then((result) => {
        res.json({
          roomid: result._id,
          msg: "Added successfully",
        });
        // hotelController.sayHii();
      })
      .catch((err) => {
        res.json("Error");
      });
  },

  getRooms: (req, res) => {
    RoomModel.find({ hotel_id: req.params.id })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json("Error");
      });
  },
};
module.exports = roomController;