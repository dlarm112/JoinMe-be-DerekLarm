const Event = require("../models/event");

const getModalEvents = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // .page is the param
  const limit = parseInt(req.query.limit) || 8;
  const skip = (page - 1) * limit;
  const PAGE_SIZE = 8;
  console.log("getting page: ", page);

  const events = await Event.find().sort({rawDate: 1}).limit(PAGE_SIZE).skip(skip);
  const numDocuments = await Event.find().countDocuments();
  res.send({
    data: events,
    maxPageNum: Math.ceil(numDocuments / PAGE_SIZE),
  });
};

module.exports = {
  getModalEvents,
};
