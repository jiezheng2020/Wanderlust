const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Event } = require("../../db/models/");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const events = await Event.findAll();
    return res.json(events);
  })
);

module.exports = router;
