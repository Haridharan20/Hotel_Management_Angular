const RoomModel = require("../model/room.model");
const hotelController = require("../controller/hotel.controller");
const roomController = {
  addRoom: (req, res) => {
    const { hotel_id, roomtype, price, capacity } = req.body;
    const model = RoomModel({
      hotel_id,
      roomtype,
      price,
      capacity,
    });
    model
      .save()
      .then((result) => {
        res.json({
          roomid: result._id,
          msg: "Added successfully",
        });
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

  getRoom: (req, res) => {
    RoomModel.findById(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log("Error");
      });
  },

  updateBooking: (req, res) => {
    console.log("called");
    console.log(req.body.id);
    RoomModel.updateOne(
      { _id: req.body.id },
      { $push: { bookings: req.body.dates } },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          console.log("res", result);
          res.send(result);
        }
      }
    );
  },
};
module.exports = roomController;
