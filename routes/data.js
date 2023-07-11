const express = require('express');
const router = express.Router();

const { postData } = require('../controllers/postData');

router.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

router.post('/data', postData);

module.exports = router;