"use strict";


document.body.addEventListener("keypress", (event) =>
{
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter")
    {
        // event.preventDefault();
        document.getElementById("loginBtn").click();
    }
});

function login()
{
    ClearError();
    let form = document.loginForm;
    
    if(IsInValidInputFeild(form.username) || IsInValidInputFeild(form.password))
    {
        return;
    }

    let input = { username: form.username.value, password: form.password.value }
    let apiurl = `/api/user/login/${input.username}/${input.password}`;

    GetLoginData(apiurl).then(result =>
    {
        let user = result;

        if (user.length > 0)
        {
            SetAuthCookie(user, 1);
            window.location.href = HOME_PAGE;
        }
        else
        {
            form.password.value = "";
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

function IsInValidInputFeild(feild)
{
    if (feild.value === "" || feild.value === undefined)
    {
        feild.style.borderColor="red";
        return true;    
    }
    
    return false;
}