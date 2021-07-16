const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const sessionsRouter = express.Router();

sessionsRouter.use(express.json());

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return response.status(500).json({
                error: 'Email e/ou senha incorreto(s).'
            });
        }

        const passwordMatched = await bcryptjs.compare(password, user.password);
        if (!passwordMatched) {
            return response.status(500).json({
                error: 'Email e/ou senha incorreto(s).'
            });
        }

        const token = jwt.sign({}, 'secret_key', {
            subject: user.id.toString(),
            expiresIn: '1d',
        });

        user.password = undefined;
        return response.status(201).json({ user, token });
    } catch (error) {
        return response.status(500).json({error: error.message});
    }
});

module.exports = sessionsRouter;