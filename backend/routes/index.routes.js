const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes.js');

router.use((req, res, next) => {
    const logDetails = `Method: ${req.method}, URL: ${req.originalUrl}`;
    console.log(logDetails);
    next();
});


router.use('/user', userRoutes);
router.get('/', (req, res)=>{ res.send("Server is up and running");});

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        stack: err.stack || ''
    });
});

module.exports = router;