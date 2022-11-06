'use strict';

/* --- test data --- */
const users = [{ id: "123", username: "eli", password: "eli", auth: "asdf" }];
/* --- test data --- */

const dbUser = require("../database/dbUser");
const dotenv = require('dotenv');
dotenv.config();
const router = require("../routes/userRoute");
const base = require("/baseController");
const COOKIE_NAME = process.env.COOKIE_NAME;

exports.VerifyUser = (username, password) => // TODO -> encrypt cookie for sending back to client
{
    let user = dbUser.GetUser(username, password);
    if (user.id > 0)
    {
        let obj = []

        obj.push("UserName=" + user.username)
        obj.push("Auth=" + user.auth)
        obj.push(COOKIE_NAME + "=" + "LoggedIn");
        console.log(obj);
        return obj;
    }
    else
    {
        return null;
    }
}

exports.ParseCookies = (cookies) =>
{
    if (base.IsNullOrEmpty(cookies))
        return null;

    const temp = cookies.split(';');
    for (let i = 0; i < temp.length; i++)
    {
        let c = temp[i].trim().split('=');
        if (c[0] === COOKIE_NAME)
            return c[1];
    }

    return null;
}

function Encypt()// TODO
{

}

function Decrypt()// TODO
{

}