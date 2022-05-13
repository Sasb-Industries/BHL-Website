'use strict';

/* --- test data --- */
const users = [{ id: "123", username: "eli", password: "eli", auth: "asdf" }];
/* --- test data --- */

const dbUser = require("../database/dbUser");
const dotenv = require('dotenv');
const router = require("../routes/userRoute");
dotenv.config();
const COOKIE_NAME = process.env.COOKIE_NAME;

exports.VerifyUser = (username, password) => // TODO -> encrypt cookie for sending back to client
{
    return dbUser.GetUser(username, password);
}

exports.ParseCookies = (cookies) =>
{
    if (cookies === undefined) return "";

    const temp = cookies.split(';');
    for (let i = 0; i < temp.length; i++)
    {
        let c = temp[i].trim().split('=');
        if (c[0] === COOKIE_NAME)
        {
            return c[1];
        }
    }

    return "";
}

function Encypt()// TODO
{

}

function Decrypt()// TODO
{

}