const express = require('express');
const router = express.Router();

const { getBalance, transferFund } = require('../controllers/account.controller.js');
const { authMiddleware } = require('../middlewares/auth.middleware.js');

router.get('/balance', authMiddleware, getBalance);
router.post('/transfer', authMiddleware, transferFund);

module.exports = router;