// npm run dev -> to run nodemon
"use strict";

const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;

// const routes
const userRoute = require("./routes/userRoute");

// setup controllers
const userController = require("./controllers/userController");

// Express Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// BEGIN SETUP API ROUTES
// user route will authenticate inside js file
app.use("/api/user", userRoute);


// SETUP WEBPAGES
app.get('/login', (req, res) =>
{
    res.sendFile(__dirname + '/public/login.html');
});

// TODO -> setup routes to do all the api junk


// // Catches access to all other pages
// Requires them to have the BHLauth cookie
// TODO -> make this better
app.use((req, res, next) =>
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

app.get('/user', (req, res) =>
{
    res.sendFile(__dirname + '/public/user.html');
});

// if not found we should send to 404
app.get('*', (req, res) =>
{
    res.redirect("/404");
});

app.listen(PORT, error =>
{
    if(error)
    {
        console.log("ERROR", error);
    }

    console.log('listening on : ', PORT);
});


//TODO -> look at server side express tokens to authenticate user that way as well
//TODO -> encrypt the cookiesr