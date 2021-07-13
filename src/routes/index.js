var express = require('express');
var productsRouter = require('./products.routes');
var usersRouter = require('./users.routes');

var routes = express.Router();
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);

module.exports = routes;