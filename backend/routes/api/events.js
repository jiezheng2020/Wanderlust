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
  "/user/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const events = await EventAttendee.findAll({
      where: { userId: id },
    });
    return res.json(events);
  })
);

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
      attributes: {
        exclude: [],
        include: ["id"],
      },
      order: [["createdAt", "ASC"]],
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
    const { userId, eventId } = req.body;
    const newMember = await EventAttendee.create({ eventId, userId });

    return res.json(newMember);
  })
);

router.post(
  "/:id/comment",
  asyncHandler(async (req, res) => {
    const { eventId, userId, body } = req.body;
    const comment = await Comment.create({ eventId, userId, body });
    return res.json(comment);
  })
);

router.delete(
  "/:id/comment",
  asyncHandler(async (req, res) => {
    const { commentId } = req.body;

    await Comment.destroy({ where: { id: commentId } });

    return res.json({ commentId });
  })
);

router.put(
  "/:id/comment",
  asyncHandler(async (req, res) => {
    const { eventId, commentId, userId, body } = req.body;
    const newEventId = parseInt(eventId, 10);

    await Comment.update(
      {
        body,
      },
      { where: { id: commentId } }
    );

    const newComment = await Comment.findOne({ where: { id: commentId } });

    return res.json(newComment);
  })
);

module.exports = router;
