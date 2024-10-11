const express = require('express');
const router = express.Router();
const illerController = require('../../controllers/illerController');

router.get('/iller', illerController.getAllCitiesAndDistricts);

module.exports = router;
