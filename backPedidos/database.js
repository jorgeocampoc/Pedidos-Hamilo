var mysql = require('mysql');
var dotenv = require('dotenv');
dotenv.config();
var connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'sistema_pedidos'
});
// hola
// hola como estas
// daro 
module.exports = connection;
