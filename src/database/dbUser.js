"use strict";

// test user
const users = [{ id: "123", username: "e", password: "e", auth: "asdf" }];


exports.GetUser = (username, password) =>
{
    let userObj = { id: "0", username: username, password: password, auth: "" };
    // TODO users[] = db call, remove the for loop, wont need it

    for (let i = 0; i < users.length; i++)
    {
        if (username === users[i].username
            && password === users[i].password)
        {
            userObj.id = users[i].id;
            userObj.auth = users[i].auth;
            break;
        }
    }

    return userObj;
}

exports.GetUserByID = (id) =>
{
    let userObj = { id: "0", username: username, password: password, auth: "" };
    // TODO users[] = db call, remove the for loop, wont need it

    for (let i = 0; i < users.length; i++)
    {
        if (username === users[i].username
            && password === users[i].password)
        {
            userObj.id = users[i].id;
            userObj.auth = users[i].auth;
            break;
        }
    }

    return userObj;
}