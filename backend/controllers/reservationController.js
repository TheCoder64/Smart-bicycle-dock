const Reservation = require("../models/Reservation");

// ➕ ADD RECORD
exports.addReservation = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone required" });
    }

    const newRes = new Reservation({
      name,
      phone,
      status: "ACTIVE"
    });

    await newRes.save();

    res.json({
      message: "Reservation created",
      data: newRes
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 📋 GET ALL LOGS
exports.getAllReservations = async (req, res) => {
  try {
    const data = await Reservation.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ❌ DELETE RECORD (using name + phone)
exports.deleteReservation = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const record = await Reservation.findOne({ name, phone });

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    record.status = "EMPTY";
    await record.save();

    res.json({ message: "Slot emptied successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 GET EMPTY SLOTS
exports.getEmptySlots = async (req, res) => {
  try {
    const data = await Reservation.find({ status: "EMPTY" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔍 SEARCH (using name + phone)
exports.searchReservation = async (req, res) => {
  try {
    const { name, phone } = req.query;

    if (!name || !phone) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const record = await Reservation.findOne({ name, phone });

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✏️ UPDATE (using name + phone)
exports.updateReservation = async (req, res) => {
  try {
    const { name, phone, dockLocation, rentalDuration } = req.body;

    const record = await Reservation.findOne({ name, phone });

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    if (record.status === "CLOSED") {
      return res.status(403).json({ message: "Update not allowed" });
    }

    if (dockLocation) record.dockLocation = dockLocation;
    if (rentalDuration) record.rentalDuration = rentalDuration;

    await record.save();

    res.json({ message: "Updated successfully", data: record });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};