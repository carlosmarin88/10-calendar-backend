const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, resp = response) => {

    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email });
        //console.log(user);
        if (user) {
            return resp.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo electronico'
            });
        }
        user = new User(req.body);

        // Encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Generar JWT
        const token = await generateJWT(user.id, user.name);

        return resp.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        console.error(error);
        resp.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const loginUser = async (req, resp = response) => {


    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });
        //console.log(user);
        if (!user) {
            return resp.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese correo electronico'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return resp.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar nuestro JWT
        const token = await generateJWT(user.id, user.name);

        resp.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.error(error);
        resp.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}

const renewToken = async (req, resp = response) => {

    const { uid, name } = req;

    // generar un nuevo JWT y retornarlo en esta petición
    const token = await generateJWT(uid, name);

    resp.json({
        ok: true,
        token,
        uid,
        name

    });
}


module.exports = {
    createUser,
    loginUser,
    renewToken,
}