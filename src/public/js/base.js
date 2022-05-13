const HOME_PAGE = "home";
const LOGIN_PAGE = "login";
const _404_PAGE = "404";
const COOKIE_NAME = 'BHLauth' //TODO, remove this from front end
// const _PAGE = "home";
// const HOME_PAGE = "home";


async function PostData(url, auth, data = {})
{
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
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

function GetAuthCookie()
{
    let name = COOKIE_NAME + "=";
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
            return JSONtoObj(c.substring(name.length, c.length));
        }
    }
    return "";
}

// takes in object to set as cookie
function SetAuthCookie(value, exhours)
{
    const d = new Date();
    d.setTime(d.getTime() + (exhours * 3600 * 1000));
    let expires = "expires=" + d.toUTCString() + ';';

    let name = COOKIE_NAME + '=' + JSON.stringify(value) + ';';
    let domain = '';  //'domain=.' + window.location.host.toString() + ';'; //TODO -> make it domain specific
    let path = 'path=/;';

    let cookie = [name, domain, expires, path].join('');
    document.cookie = cookie;
}

function ResetAuth()
{
    let cookie = GetAuthCookie();

    if(cookie !== "")
    {
        SetAuthCookie(cookie, 1);
    }
}



// RUNS everytime a page is loaded
(function ()
{
    ResetAuth();
})();
