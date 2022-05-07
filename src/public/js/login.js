"use strict";

function login()
{
    let form = document.loginForm;
    let input = { username: form.username.value, password: form.password.value }
    let apiurl = `/api/login/${input.username}/${input.password}`;
    
    GetLoginData(apiurl).then(result =>
    {
        let user = result;

        if (user.id > 0)
        {
            sessionStorage.setItem('auth', user.auth);
            window.location.href = HOME_PAGE;
        }
        else
        {
            SetError("User not found");
        }
    });

    document.cookie = "username=eli";;
}

async function GetLoginData(url)
{
    try
    {
        // Default options are marked with *
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    catch
    {
        SetError("Error in getting user");
        return "";
    }
}


function SetError(s)
{
    let error = document.getElementById("error");
    error.textContent = s;
    error.style.display = "block";
}

function ClearError()
{
    let error = document.getElementById("error");
    error.textContent = "";
    error.style.display = none;
}