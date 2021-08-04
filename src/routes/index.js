const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const productsRouter = require('./products.routes');
const usersRouter = require('./users.routes');
const sessionsRouter = require('./sessions.routes');

const routes = express.Router();

function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(403).json({
            message: 'Token inexistente'
        });
    }
    
    /*
    const auth = authHeader.split(' ');
    const type = auth[0];
    const token = auth[1];
    */
    const [, token] = authHeader.split(' ');
    try {
        jwt.verify(token, 'secret_key');
        return next();
    } catch (error) {
        return response.status(403).json({
            message: 'Token inválido'
        });
    }
}

routes.use(cors());
routes.use('/sessions', sessionsRouter);
routes.use(ensureAuthenticated);
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);

module.exports = routes;