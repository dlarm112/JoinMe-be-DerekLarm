var express = require("express");
var router = express.Router();
const {
  createEvent,
  getEvents,
  getEvent,
} = require("../controllers/eventController");
const Event = require("../models/event");

/* /EVENT */
router.route("/").post(createEvent).get(getEvents);

router.delete("/:id", async (req, res) => {
  const result = await Event.deleteOne({ _id: req.params.id });
  res.send(result);
});

module.exports = router;
