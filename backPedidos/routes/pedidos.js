var express = require("express");
var router = express.Router();
var conexion = require("../database");


router.get("/", function (req, res, next) {
  var query = "SELECT * FROM pedidos;";

  conexion.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send({
        error: error,
        message: "Error al realizar la peticion",
      });
    } else {
      console.log(results);
      res.status(200).send({
        data: results,
        message: "Listando pedidos",
      });
    }
  });
});

router.post("/", function (req, res, next) {
  const fechaHoy = new Date().toISOString().slice(0, 19).replace("T", " ");
  const { producto_id, cliente_id, vendedor_id, comentario, fecha_entrega, coordenadas, direccion } = req.body;

  var query = `INSERT INTO pedidos (producto_id, cliente_id, vendedor_id,comentario,fecha_pedido,fecha_entrega, coordenadas, direccion) VALUES ("${producto_id}","${cliente_id}","${vendedor_id}","${comentario}","${fechaHoy}","${fecha_entrega}","${coordenadas}", "${direccion}");`;

  // ejecutamos la consulta
  conexion.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send({
        error: error,
        message: "Error al realizar la peticion",
      });
    } else {
      console.log(results.insertId);
      res.status(200).send({
        data: results.insertId,
        message: "Pedido registrado correctamente",
      });
    }
  });
});



module.exports = router;