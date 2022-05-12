var mongoose = require("mongoose");
const HotelModel = require("../model/hotel.model");
const hotelController = {
  add: (req, res) => {
    console.log(req);
    const { hotelname, address, city, state, zip, phone } = req.body;
    const model = new HotelModel({
      name: hotelname,
      address,
      city,
      state,
      zip,
      contact_no: phone,
    });
    model
      .save()
      .then((result) => res.json("Hotel Added successfully"))
      .catch((err) => res.json("Error"));
  },
  getHotels: (req, res) => {
    HotelModel.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json("Error");
      });
  },
  getHotel: (req, res) => {
    console.log(req);
    let hotel_id = req.params.id;
    HotelModel.findById(hotel_id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json("error");
      });
  },
  getHotelAndUpdateRoom: (req, res) => {
    console.log("update", req.body);
    HotelModel.updateOne(
      { _id: req.body.hotel_id },
      { $push: { rooms: [req.body.rooms] } },
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

  HotelByCity: (req, res) => {
    console.log(req.query.city);
    console.log(typeof req.query.city);
    HotelModel.find({ city: req.query.city })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json({ msg: "Not Found" });
      });
  },
};

module.exports = hotelController;
