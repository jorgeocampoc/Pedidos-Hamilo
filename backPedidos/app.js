var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var productosRouter = require('./routes/productos');

const pedidosRouter = require('./routes/pedidos');

var usuariosRouter = require('./routes/usuarios');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/productos', productosRouter);

app.use('/pedidos', pedidosRouter);

app.use('/usuarios', usuariosRouter);
app.use('/auth', authRouter); 


// function verifyToken(req, res, next){
//     const authHeader = req.headers['authorization'];
//     console.log(authHeader);
//     if(authHeader){
//         const token = authHeader.split(' ')[1]; 
//         jwt.verify(token, 'secretKey',(err, user)=>{
//             if( err ){
//                 return res.status(403).json({
//                     ok:false,
//                     msg:'Token invalido'
//                 })
//             }else{
//                 req.user =user;
//                 next();
//             }
//         })
//     }else{
//         return res.status(403).json({
//             ok:false,
//             msg:'Sin token'
//         })
//     } 
// } 



module.exports = app;
