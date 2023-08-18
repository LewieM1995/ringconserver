const express = require('express');
const router = express.Router();

const { postData } = require('../controllers/postData');
const { getData } = require('../controllers/getData');
const { getDataTable } = require('../controllers/getDataTable');
//const { getData15LT } = require('../controllers/getData15LT');
//const { getData20LT } = require('../controllers/getData20LT');

router.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

router.post('/data', postData);
router.get('/data', getData);
router.get('/data_table', getDataTable);

module.exports = router;