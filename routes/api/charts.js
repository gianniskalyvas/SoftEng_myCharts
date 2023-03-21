const express = require('express');
const router = express.Router();
const chartsController = require('../../controllers/chartsController');

router.route('/')
    .get(chartsController.getAllCharts)
    .post(chartsController.createNewChart)
    .delete(chartsController.deleteChart);

router.route('/:name')
    .get(chartsController.getChart);

module.exports = router;