// npm run dev -> to run nodemon
"use strict";

const PORT = 3000;

const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');

// setup controllers
const userController = require("./controllers/userController");

// Express Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// BEGIN SETUP LOGIN
app.get('/login', (req, res) =>
{
    res.sendFile(__dirname + '/public/login.html');
});

// see if user is available
app.get('/api/login/:username/:password', (req, res) =>
{
    let result = userController.VerifyUser(req.params.username, req.params.password)
    if(result.id > 0)
    {
        // req.session.accessToken = true;
    }
    res.json(result);
});


// // Catches access to all other pages
// app.use((req, res, next) =>
// {
//     console.log(userController.ParseCookies(req.headers.cookie));
//     // requiring a valid access token
//     // if (!req.session.accessToken)
//     // {
//     //     res.redirect('/login');
//     // }
//     // else
//     // {
//     //     next();
//     // }
//     //res.redirect('/login');

//     next();
// });
// END SETUP LOGIN

// BEGIN SETUP ROUTES
app.get('/', (req, res) =>
{
    res.redirect("/home");
});

app.get('/home', (req, res) =>
{
    res.sendFile(__dirname + '/public/home.html');
});

app.get('/404', (req, res) =>
{
    res.sendFile(__dirname + '/public/404.html');
});

// if not found we should send to home page
app.get('*', (req, res) =>
{
    res.redirect("/404");
});
// END SETUP ROUTES

// BEGIN SETUP APIs
// END SETUP APIs

app.listen(PORT, () =>
{
    console.log('listening on : ', PORT);
});


//TODO -> look at server side express tokens to authenticate user that way as well
//TODO -> encrypt the cookiesr