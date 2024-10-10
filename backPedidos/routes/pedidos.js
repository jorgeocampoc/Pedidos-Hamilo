var express = require("express");
var router = express.Router();
var conexion = require("../database");


router.get("/", function (req, res, next) {
  var query = `SELECT pedidos.*, productos.nombre_producto AS producto_nombre, productos.imagen, usuarios.nombre AS cliente, usuarios.telefono
              FROM pedidos 
              LEFT JOIN productos ON pedidos.producto_id = productos.id
              LEFT JOIN usuarios ON pedidos.cliente_id = usuarios.id`

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

router.post("/store", function (req, res, next) {
  const fechaHoy = new Date().toISOString().slice(0, 19).replace("T", " ");
  const { producto_id, cliente_id, vendedor_id, comentario, fecha_entrega, coordenadas, direccion } = req.body;

  var query = `INSERT INTO pedidos (producto_id, cliente_id, vendedor_id, comentario, fecha_pedido, fecha_entrega, coordenadas, direccion) VALUES("${producto_id}", "${cliente_id}", "${vendedor_id}", "${comentario}", "${fechaHoy}", "${fecha_entrega}", "${coordenadas}", "${direccion}"); `;

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

/* router.put("/:id", function (req, res, next) {
  const { comentario, fecha_entrega, coordenadas, direccion } = req.body;
  const { id } = req.params;
  const fechaHoy = new Date().toISOString().slice(0, 19).replace("T", " ");

  var query = `UPDATE pedidos SET  "comentario" = "${comentario}", "fecha_pedido" = "${fechaHoy}", "fecha_entrega" = "${fecha_entrega}", "coordenadas" = "${coordenadas}", "direccion" = "${direccion}" WHERE id = ${ id }; `;

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
        message: "Pedido actualizado correctamente",
      });
    }
  });

});

router.delete("/:id", function (req, res, next) {
  const { id } = req.params;
  var query = `DELETE FROM pedidos WHERE id = ${ id }; `;

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
        message: "Pedido eliminado correctamente",
      });
    }
  });
}); */

router.put("/estado/:id", function (req, res, next) {
  const { id } = req.params;
  const { estado } = req.body;
  console.log(estado);
  var query = `UPDATE pedidos SET  estado = "${estado}" WHERE id = ${id}; `;

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
        message: "Estado actualizado correctamente",
      });
    }
  });
});

router.get("/usuario/:id", function (req, res, next) {
  var query = `SELECT pedidos.*, productos.nombre_producto AS producto_nombre, productos.imagen, usuarios.nombre AS cliente, usuarios.telefono
              FROM pedidos 
              LEFT JOIN productos ON pedidos.producto_id = productos.id
              LEFT JOIN usuarios ON pedidos.cliente_id = usuarios.id
               where pedidos.vendedor_id = ${req.params.id}; `;
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
})


module.exports = router;