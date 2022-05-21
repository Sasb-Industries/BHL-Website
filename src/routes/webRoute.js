"use strict";

/*
route -> '/'
*/

const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require("../controllers/userController");

router.route('/login').get((req, res) =>
{
    let cookie = userController.ParseCookies(req.headers.cookie);
    if (cookie === undefined || cookie === "")
    {
        res.sendFile(path.resolve('src/public/login.html'));
    }
    else
    {
        res.redirect('/home');
    }
});

// Catches access to all other pages
// Requires them to have the BHLauth cookie
// TODO -> make this better with auth maybe
router.use((req, res, next) =>
{
    let cookie = userController.ParseCookies(req.headers.cookie);
    if (cookie === undefined || cookie === "")
    {
        res.redirect('/login');
    }
    else
    {
        next();
    }
});

router.route('/').get((req, res) =>
{
    res.redirect("/home");
});

router.route('/home').get((req, res) =>
{
    res.sendFile(path.resolve('src/public/home.html'));
});

router.route('/404').get((req, res) =>
{
    res.sendFile(path.resolve('src/public/404.html'));
});

router.route('/user').get((req, res) =>
{
    res.sendFile(path.resolve('src/public/user.html'));
});

router.route('/scores').get((req, res) =>
{
    res.sendFile(path.resolve('src/public/scores.html'));
});

router.route('/nav').get((req, res) =>
{
    res.sendFile(path.resolve('src/public/nav.html'));
});

// if not found we should send to 404
router.route('*').get((req, res) =>
{
    res.redirect("/404");
});

module.exports = router;