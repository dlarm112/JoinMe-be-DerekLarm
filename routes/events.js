var express = require('express');
var router = express.Router();
const { createEvent, getEvents } = require('../controllers/eventController')

/* /EVENT */
router.route('/')
.post(createEvent)
.get(getEvents)

module.exports = router;
