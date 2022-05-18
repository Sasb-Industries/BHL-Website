"use strict";

/* --- base -> /api/user path ---*/

const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const {Authenticate} = require("../controllers/authController");

// see if user is available
router.route('/login/:username/:password').get( (req, res) =>
{
    let result = userController.VerifyUser(req.params.username, req.params.password)
    res.send(result);
});

// any other call should be authenticated
router.use((req, res, next) =>
{
    Authenticate();
    next();
});


router.route("/allusers").get((req, res) =>
{
    res.send("TODO send all users");
});

module.exports = router;