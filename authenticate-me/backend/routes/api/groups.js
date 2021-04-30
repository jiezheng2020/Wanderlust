const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Group, Event, User, GroupCalendar } = require("../../db/models/");

const router = express.Router();

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const group = await Group.findByPk(id, {
      include: [{ model: Event, as: "Calendars" }, User],
    });

    return res.json(group);
  })
);

// router.get(
//   "/:id/events",
//   asyncHandler(async (req, res) => {
//     const id = req.params.id;
//     const listEvents = await GroupCalendar.findAll({
//       where: { groupId: id },
//     });

//     return res.json(listEvents);
//   })
// );

module.exports = router;
