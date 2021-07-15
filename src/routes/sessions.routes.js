var express = require('express');
var bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { User } = require('../../models');
var sessionsRouter = express.Router();

sessionsRouter.use(express.json());

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return response.status(404).json({ error: 'Email e/ou senha incorreto(s).' });
        }

        const passwordMatched = await bcryptjs.compare(password, user.password);
        if (!passwordMatched){
            return response.status(404).json({ error: 'Email e/ou senha incorreto(s).' });
        }

        const token = jwt.sign({}, 'secretkey', {
            subject: user.id.toString(),
            expiresIn: '1d',
        });

        user.password = undefined;
        return response.status(201).json({ user, token });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
});

module.exports = sessionsRouter;