const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Event, Group, User, EventAttendee } = require("../../db/models/");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const events = await Event.findAll({
      include: [{ model: User, as: "Attendees" }, Group],
    });
    return res.json(events);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const event = await Event.findByPk(id, {
      include: [
        { model: User, as: "Attendees" },
        { model: User, as: "Comments" },
        Group,
      ],
    });
    return res.json(event);
  })
);

module.exports = router;
