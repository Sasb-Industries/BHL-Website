"use strict";

exports.IsNullOrEmpty = (obj) =>
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