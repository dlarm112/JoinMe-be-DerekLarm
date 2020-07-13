const Event = require("../models/event");

const createEvent = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;

  console.log(req.body);

  const newEvent = await Event.create({
    title,
    description,
  });
  console.log(newEvent);
  res.send(newEvent);
};

const getEvents = async (req, res) => {
    const events = await Event.find()

res.send(events)
}

module.exports = {
  createEvent,
  getEvents,
};
