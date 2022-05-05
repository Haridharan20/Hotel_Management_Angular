const mongoose = require("mongoose");

const HotelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    rquired: true,
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
  ],

  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    requird: true,
  },

  contact_no: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  ratings: {
    type: Number,
    default: 0,
  },
});

const HotelModel = mongoose.model("Hotel", HotelSchema);
module.exports = HotelModel;
