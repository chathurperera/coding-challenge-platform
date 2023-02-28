const express = require('express');
const router = express.Router();
const { testCode, submitCode } = require('../controllers/codeController');

router.post('/test', testCode);
router.post('/submit', submitCode);

module.exports = router;
