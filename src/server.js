// npm run dev -> to run nodemon
"use strict";

const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;

//#region const routes
const apiUserRoute = require("./routes/userRoute");
const webRoute = require("./routes/webRoute");
//#endregion

// Express Middleware for serving static files
app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use('/images',express.static(path.join(__dirname, 'public/images')));
app.use('/js',express.static(path.join(__dirname, 'public/js')));

// TODO -> setup routes to do all the api junk
app.use("/api/user", apiUserRoute);

// webpages routing
app.use("/", webRoute);

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