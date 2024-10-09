var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
var conexion = require('../database');
 
/* GET users listing. */
router.get("/", function (req, res, next) {
    
  var query = "SELECT * FROM usuarios";
  conexion.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send({
        error: error,
        message: "Error en la base de datos",
      });
    } else {
      console.log(results);
      res.status(200).send({
        data: results,
        message: "Listando usuarios",
      });
    }
  });
});
 
router.post('/', async function (req, res, next) {
 
  const { nombre, correo, telefono, usuario, contrasena,rol } = req.body;
 

  const hashedPassword = await bcrypt.hash(contrasena, 10);
 
  const query = `INSERT INTO usuarios (nombre,correo, telefono, usuario, contrasena,rol)
              VALUES ("${nombre}", "${correo}", "${telefono}", "${usuario}","${hashedPassword}","${rol}");`;
 
  conexion.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send({
        error: error,
        message: 'Error en la consulta',
      });
    } else {
      console.log(results);
      res.status(200).send({
        data: results,
        message: 'Usuario registrado',
      });
    }
  });
});
 
router.put('/:id', async function (req, res, next) {
 
  const { nombre, correo, telefono, usuario, contrasena,rol } = req.body;
 
  const hashedPassword = await bcrypt.hash(contrasena, 10);
 
  const query = `UPDATE usuarios SET nombre =  "${nombre}", 
  correo = "${correo}", telefono = "${telefono}", usuario = "${usuario}",contrasena = "${hashedPassword}", 
  rol = "${rol}" WHERE id = ${req.params.id};`;
 
  conexion.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send({
        error: error,
        message: 'Error en la consulta',
      });
    } else {
      console.log(results);
      res.status(200).send({
        data: results,
        message: 'Usuario actualizado',
      });
    }
  });
});
router.put('/estado/:id', function (req, res, next) {
 
    var query = `UPDATE usuarios SET estado = !estado WHERE id = ${req.params.id};`;
 
    conexion.query(query, function (error, results, fields) {
 
      if (error) {
        res.status(500).send({
          error: error,
          message: 'Error en realizar la peticion'
        });
 
      } else {
        res.status(200).send({
          data: results,
          message: 'Estado actualizado correctamente'
        });
      }
    });
  });


  router.delete('/:id', function (req, res, next) {
 
    var query = `delete from usuarios WHERE id = ${req.params.id};`;
 
    conexion.query(query, function (error, results, fields) {
 
      if (error) {
        res.status(500).send({
          error: error,
          message: 'Error en realizar la peticion'
        });
 
      } else {
        res.status(200).send({
          data: results,
          message: 'usuario eliminado'
        });
      }
    });
  });


module.exports = router;

