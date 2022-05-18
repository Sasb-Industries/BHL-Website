"use strict";

function LoadPage()
{
    let user = GetAuthCookie();
    document.title = "User - " + user.username;
}