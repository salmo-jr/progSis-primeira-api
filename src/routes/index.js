var express = require('express');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var productsRouter = require('./products.routes');
var usersRouter = require('./users.routes');
var sessionsRouter = require('./sessions.routes');

var routes = express.Router();

function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(403).json({ message: 'Token inexistente' });
    }

    const [, token] = authHeader.split(' ');
    try {
        jwt.verify(token, 'secretkey');
        return next();
    } catch (error) {
        return response.status(403).json({ message: 'Token inválido' });
    }
}

routes.use(cors());
routes.use('/sessions', sessionsRouter);
routes.use(ensureAuthenticated);
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);

module.exports = routes;
