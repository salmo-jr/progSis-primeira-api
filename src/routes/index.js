var express = require('express');
var productsRouter = require('./products.routes');
var sessionsRouter = require('./sessions.routes');

var routes = express.Router();

routes.use('/products', productsRouter);
routes.use('/sessions', sessionsRouter);

module.exports = routes;
