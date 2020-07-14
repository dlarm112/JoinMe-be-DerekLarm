const Event = require("../models/event");

const createEvent = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const maxGroupSize = req.body.maxGroupSize;
  const lat = req.body.lat;
  const lng = req.body.lng;

  console.log(req.body);

  const newEvent = await Event.create({
    title,
    description,
    startTime,
    endTime,
    maxGroupSize,
    lat,
    lng,
  });
  console.log(newEvent);
  res.send(newEvent);
};

const getEvents = async (req, res) => {
  const events = await Event.find();

  res.send(events);
};

module.exports = {
  createEvent,
  getEvents,
};
