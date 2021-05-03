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
      image:
        "https://media.istockphoto.com/vectors/portrait-of-business-team-standing-together-multiracial-business-vector-id1151939169?k=6&m=1151939169&s=612x612&w=0&h=jHxk3XMAVOb6x2sW36oaaplVvPrjuVOmckQYMYE3EDo=",
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

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { userId, groupId } = req.body;
    const newMember = await GroupMember.destroy({ where: { groupId, userId } });

    return res.json(newMember);
  })
);

module.exports = router;
