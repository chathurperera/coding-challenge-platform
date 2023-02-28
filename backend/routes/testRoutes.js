const express = require('express');
const router = express.Router();
const { createTest, getTest, updateTest, deleteTest, getAllTests } = require('../controllers/testController');
const verifyJWT = require('../middleware/authMiddleware');


router.post('/create', verifyJWT, createTest);
router.get('/', verifyJWT, getAllTests);
router.get('/:testId', getTest);
router.patch('/:testId', verifyJWT, updateTest);
router.delete('/:testId', verifyJWT, deleteTest);

module.exports = router;