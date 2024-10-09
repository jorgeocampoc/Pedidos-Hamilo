var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
var conexion = require('../database');
var jwt = require('jsonwebtoken');
 
router.post('/login', function (req, res, next) {
    const { correo, contrasena } = req.body;
 
    var query = `SELECT * FROM usuarios WHERE correo = "${correo}";`;
 
    conexion.query(query, async function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).json({
                error: error,
                message: 'Error al realizar la petición'
            });
        } else {
            if (results.length == 0) {
                res.status(403).json({
                    message: 'El usuario no existe'
                });
            } else {
                const usuario = results[0];
                // console.log(usuario.contrasena);
                const verifica = await bcrypt.compare(contrasena, usuario.contrasena);
                // console.log(verifica);
                if (!verifica) {
                    res.status(403).json({
                        message: 'Usuario o contraseña incorrectos'
                    });
                } else {
                    // creamos el token
                    const token = jwt.sign({ usuario: usuario }, 'secretkey', { expiresIn: '1h' });
                    res.status(200).json({
                        usuario: usuario,
                        token: token
                    });
                }
            }
        }
    });
});
module.exports = router;