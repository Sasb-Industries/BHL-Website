
// test user
const users = [{ id: "123", username: "eli", password: "eli", auth: "asdf" }];


exports.VerifyUser = (username, password) =>
{
    let authobject = { id: "0", username: username, password: password, auth: "" };
    for (let i = 0; i < users.length; i++)
    {
        if (username === users[i].username
            && password === users[i].password)
        {
            authobject.id = users[i].id;
            authobject.auth = users[i].auth;
            break;
        }
    }

    return authobject;
}

exports.ParseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .map(([k, ...vs]) => [k, vs.join('=')])
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});