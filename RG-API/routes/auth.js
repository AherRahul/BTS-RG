const express = require('express');
const router = express.Router();
const { IsSignedIn, authCtrl } = require("../controllers/auth");

router.post('/register', authCtrl.registerUser);

router.post('/login', authCtrl.LoginUser);

module.exports = router;