const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const {
  Group,
  Event,
  User,
  GroupCalendar,
  GroupMember,
} = require("../../db/models/");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const groups = await Group.findAll();
    return res.json(groups);
  })
);

router.get(
  "/user/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const groups = await GroupMember.findAll({
      where: { userId: id },
    });
    return res.json(groups);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, location, organizerId, description } = req.body;
    const newGroup = await Group.create({
      name,
      location,
      organizerId,
      description,
    });

    return res.json(newGroup);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const group = await Group.findByPk(id, {
      include: [
        { model: User, as: "Members" },
        { model: Event, as: "Calendars" },
        User,
      ],
    });

    return res.json(group);
  })
);

router.post(
  "/:id",
  asyncHandler(async (req, res) => {
    const { userId, groupId } = req.body;
    const newMember = await GroupMember.create({ groupId, userId });

    return res.json(newMember);
  })
);

module.exports = router;
