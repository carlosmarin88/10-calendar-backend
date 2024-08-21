const { response } = require('express');


const createUser = (req, resp = response) => {

    const { name, email, password } = req.body;

    return resp.status(201).json({
        ok: true,
        msg: 'registro',
        name,
        email,
        password
       
    });
}

const loginUser = (req, resp = response) => {


    const { email, password } = req.body;

    resp.json({
        ok: true,
        msg: 'login',
        email,
        password
    });
}

const renewToken = (req, resp = response) => {

    resp.json({
        ok: true,
        msg: 'renew'
    });
}


module.exports = {
    createUser,
    loginUser,
    renewToken,
}