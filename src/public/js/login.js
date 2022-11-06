"use strict";

function LoadPage()
{
    document.body.addEventListener("keypress", (event) =>
    {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter")
        {
            // event.preventDefault();
            document.getElementById("loginBtn").click();
        }
    });
}

function login()
{
    ClearError();
    let form = document.loginForm;
    
    if(IsInValidInputField(form.username) || IsInValidInputField(form.password))
        return;

    let input = { username: form.username.value, password: form.password.value }
    let apiurl = `/api/user/login/${input.username}/${input.password}`;

    GetLoginData(apiurl).then(result =>
    {
        if (!IsNullOrEmpty(result))
        {
            SetCookies(result);
            window.location.href = HOME_PAGE;
        }
        else
        {
            SetError("User not found");
        }
    });
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
    document.loginForm.password.value = "";
    let error = document.getElementById("error");
    error.textContent = s;
    error.style.display = "block";
}

function ClearError()
{
    let error = document.getElementById("error");
    error.textContent = "";
    error.style.display = "none";
    document.loginForm.password.style = "";
    document.loginForm.username.style = "";
}

function IsInValidInputField(field)
{
    if (IsNullOrEmpty(field.value))
    {
        field.style.borderColor="yellow";
        return true;    
    }
    
    return false;
}