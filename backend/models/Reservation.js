const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  reservationId: String,
  riderId: String,

  name: String,
  phone: String,

  dockLocation: String,
  rentalDuration: Number,

  createdAt: {
    type: Date,
    default: Date.now
  },

  status: {
    type: String,
    enum: ["ACTIVE", "CLOSED", "EMPTY"],
    default: "ACTIVE"
  }
});

module.exports = mongoose.model("Reservation", reservationSchema);