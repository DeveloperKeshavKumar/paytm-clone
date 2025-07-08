const express = require('express');
const router = express.Router();

const { getTransactionById, getTransactionHistory } = require('../controllers/transaction.controller.js');
const { authMiddleware } = require('../middlewares/auth.middleware.js');

router.get('/history', authMiddleware, getTransactionHistory);
router.get('/:transactionId', authMiddleware, getTransactionById);

module.exports = router;