const express = require('express');
const router = express.Router();

const { signIn, signUp, signOut, getDetails, updateDetails, getAllUsers } = require('../controllers/user.controller.js');
const { authMiddleware } = require('../middlewares/auth.middleware.js');

router.get('/', authMiddleware, getDetails);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.delete('/signout', signOut);
router.put('/', authMiddleware, updateDetails);
router.get('/all', getAllUsers);


module.exports = router;