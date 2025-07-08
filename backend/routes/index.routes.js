const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes.js');
const accountRoutes = require('./account.routes.js');
const txnRoutes = require('./transaction.routes.js');

router.use('/user', userRoutes);
router.use('/account', accountRoutes);
router.use('/transaction', txnRoutes);
router.get('/', (req, res) => { res.send("Server is up and running"); });

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        stack: err.stack || ''
    });
});

module.exports = router;