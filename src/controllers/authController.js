"use strict";

const userController = require("./userController");
const dbUser = require("../database/dbUser");

exports.Authenticate = (req, res, next) =>
{
    //TODO authenticate api calls
    // make sure they have cookie
    // make sure the auth from the user object matches what is in the user table
    // next();
}