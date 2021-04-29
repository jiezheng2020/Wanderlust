const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const {
  Event,
  Group,
  User,
  EventAttendee,
  Comment,
} = require("../../db/models/");

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
        User,
      ],
    });
    return res.json(event);
  })
);

router.post(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { eventId, userId, body } = req.body;
    const comment = await Comment.create({ eventId, userId, body });
    return res.json(comment);
  })
);

module.exports = router;
