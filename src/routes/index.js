const express = require('express');
const productsRouter = require('./products.routes');
const usersRouter = require('./users.routes');
const sessionsRouter = require('./sessions.routes');  

const routes = express.Router();
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

module.exports = routes;