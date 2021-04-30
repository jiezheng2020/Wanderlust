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
    const comments = await Comment.findAll({
      where: { eventId: id },
      include: User,
    });

    const event = await Event.findByPk(id, {
      include: [{ model: User, as: "Attendees" }, Group, User],
    });

    let data = {
      ...event.toJSON(),
      Comments: [
        ...comments.map((el) => ({
          ...el.toJSON().User,
          Comment: { ...el.toJSON() },
        })),
      ],
    };

    return res.json(data);
  })
);

router.post(
  "/:id",
  asyncHandler(async (req, res) => {
    const { eventId, userId, body } = req.body;
    const comment = await Comment.create({ eventId, userId, body });
    return res.json(comment);
  })
);

module.exports = router;
