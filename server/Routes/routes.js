const express = require('express')
const router = express.Router();

const db = require('../db/dbConnect')

router.post('/quotes', db.Submit)

module.exports = router;