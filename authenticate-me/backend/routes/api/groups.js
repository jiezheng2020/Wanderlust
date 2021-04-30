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
    console.log(req.body);
    // const newMember = await GroupMember.create(groupId, userId);
  })
);

module.exports = router;
