var express = require('express');
var router = express.Router();

var conexion = require('../database');

// Listar todos los productos
router.get('/', (req, res) => {
  const query = 'SELECT * FROM productos';
  conexion.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error al listar productos', error });
    }
    res.json(results);
  });
});

// Registrar un nuevo producto
router.post('/store', (req, res) => {
  const { codigo, nombre_producto, descripcion, imagen, vendedor_id } = req.body;
  const query = 'INSERT INTO productos (codigo, nombre_producto, descripcion, imagen, vendedor_id, created_at, updated_at) VALUES (?, ?, ? , ?, ?, NOW(), NOW())';
  conexion.query(query, [codigo, nombre_producto, descripcion, imagen, vendedor_id], (error, results) => {
    if (error) {
      return res.status(400).json({ message: 'Error al registrar producto', error });
    }
    res.status(201).json({ id: results.insertId, ...req.body, created_at: new Date(), updated_at: new Date() });
  });
});

// Actualizar un producto
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { codigo, nombre_producto, descripcion, imagen, estado, vendedor_id } = req.body;
  const query = 'UPDATE productos SET codigo = ?, nombre_producto = ?, descripcion = ?, imagen = ?, estado = ?, vendedor_id = ?, updated_at = NOW() WHERE id = ?';
  conexion.query(query, [codigo, nombre_producto, descripcion, imagen, estado, vendedor_id, id], (error, results) => {
    if (error) {
      return res.status(400).json({ message: 'Error al actualizar producto', error });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto actualizado exitosamente', id, ...req.body, updated_at: new Date() });
  });
});



// Eliminar un producto
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM productos WHERE id = ?';
  conexion.query(query, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error al eliminar producto', error });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado exitosamente' });
  });
});

// Listar productos activos
router.get('/activos', (req, res) => {
  const query = 'SELECT * FROM productos WHERE estado = "1"';
  conexion.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error al listar productos activos', error });
    }
    res.json(results);
  });
});

router.get("/usuario/:id", function (req, res, next) {
  var query = `SELECT *
                FROM productos 
               where productos.vendedor_id = ${req.params.id}; `;
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