"use strict";

function LoadPage()
{
    let user = GetCookie("UserName");
    document.title = "User - " + user;
}