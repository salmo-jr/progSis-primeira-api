var express = require('express');
var bcryptjs = require('bcryptjs');
const { User } = require('../../models');
var usersRouter = express.Router();

usersRouter.use(express.json());

usersRouter.get('/', async (request, response) => {
    try {
        const result = await User.findAll();
        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
});

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;
    try {
        const user = {
            name,
            email,
            password: await bcryptjs.hash(password, 8),
        };
        const newUser = await User.create(user);
        delete newUser.password;
        return response.status(201).json(newUser);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
});

usersRouter.put('/:id', async (request, response) => {
    const { id } = request.params;
    const user = request.body;
    
    const affectedRows = await User.update(user, {
        where: { id },
    });
    
    if (affectedRows < 1) {
        return response.status(404).json({ error: 'Usuário não encontrado.' });
    }

    return response.status(200).json({ success: 'Usuário alterado com sucesso' });
});

usersRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;
    
    const affectedRows = await User.destroy({
        where: { id },
    });
    
    if (affectedRows < 1) {
        return response.status(404).json({ error: 'Usuário não encontrado.' });
    }

    return response.status(200).json({ success: 'Usuário removido com sucesso' });
});

module.exports = usersRouter;