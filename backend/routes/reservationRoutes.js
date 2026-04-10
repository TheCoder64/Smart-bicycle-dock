const express = require("express");
const router = express.Router();

const controller = require("../controllers/reservationController");

router.post("/add", controller.addReservation);
router.get("/all", controller.getAllReservations);
router.post("/delete", controller.deleteReservation);
router.get("/empty", controller.getEmptySlots);

router.get("/search", controller.searchReservation);
router.put("/update", controller.updateReservation);

module.exports = router;