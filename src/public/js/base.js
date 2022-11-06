"use strict";

const HOME_PAGE = "home";
const LOGIN_PAGE = "login";
const _404_PAGE = "404";

// RUNS everytime a page is loaded
(function ()
{
    ResetCookies();
    LoadNav();
})();

async function PostData(url, auth, data = {})
{
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

function JSONtoObj(json)
{
    return JSON.parse(json);
}

function ObjtoJson(obj)
{
    return JSON.stringify(obj);
}

function GetCookie(cookiename)
{
    let name = cookiename + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++)
    {
        let c = ca[i];
        while (c.charAt(0) == ' ')
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0)
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function SetCookies(cookies)
{
    cookies.forEach(element =>
    {
        if (IsNullOrEmpty(element))
        {
            SetCookie(element, 1);
        }
    });
}

// takes in object to set as cookie
function SetCookie(value, exhours)
{
    if (IsNullOrEmpty(value.length))
    {
        return;
    }

    const d = new Date();
    d.setTime(d.getTime() + (exhours * 3600 * 1000));

    value = value.trim() + ";";
    let expires = "expires=" + d.toUTCString() + ';';
    let domain = '';  //'domain=.' + window.location.host.toString() + ';'; //TODO -> make it domain specific
    let path = 'path=/;';

    let cookie = [value, domain, expires, path].join('');
    document.cookie = cookie;
}

function ResetCookies() // TODO only reset our cookies, dont care about others, maybe not a TODO
{
    let cookies = document.cookie.split(";");

    if (IsNullOrEmpty(cookies))
        return;

    cookies.forEach(element =>
    {
        let name = element.substring(0, element.indexOf("=")).trim();
        let value = GetCookie(name);

        if (IsNullOrEmpty(name) || IsNullOrEmpty(value))
            return;

        SetCookie(name + "=" + value, 1);
    });
}

function LoadNav()
{
    try
    {
        fetch('nav')
            .then(res => res.text())
            .then(text =>
            {
                let x = document.getElementById("replaceNav");

                if (IsNullOrEmpty(x) || IsNullOrEmpty(text))
                {
                    return;
                }
                console.log(x);
                
                x.innerHTML = text;
            });
    }
    catch(err)
    {
        console.log(err);
        // TODO -> make an error thing
    }
}

function IsNullOrEmpty(obj)
{
    if(obj === null || obj === undefined)
        return true;    

    // empty string
    if(typeof(obj) === 'string')
        if(obj.trim() === "") 
            return true;

    // object has a length and is zero
    if(obj.length !== undefined)
        if(obj.length === 0) 
            return true;

    return false;
}