const express = require('express');
const { Op } = require('sequelize');
const { User } = require('../../models');
const usersRouter = express.Router();

usersRouter.use(express.json());

usersRouter.get('/', async (request, response) => {
    try {
        const result = await User.findAll();
        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
});

usersRouter.get('/search', async (request, response) => {
    const { text } = request.query;
    let results;
    try {
        if (text) {
            results = await User.findAll({
                where: { description: { [Op.substring]: text } }
            });
        } else {
            results = await User.findAll();
        }
        return response.status(200).json(results);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
});

usersRouter.post('/', async (request, response) => {
    try {
        const prod = await User.create(request.body);
        return response.status(201).json(prod);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
});

usersRouter.put('/:id', async (request, response) => {
    const { id } = request.params;
    const product = request.body;
    
    const affectedRows = await User.update(product, {
        where: { id },
    });
    
    if (affectedRows < 1) {
        return response.status(404).json({ error: 'Produto não encontrado.' });
    }

    return response.status(200).json({ success: 'Produto alterado com sucesso' });
});

usersRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;
    
    const affectedRows = await User.destroy({
        where: { id },
    });
    
    if (affectedRows < 1) {
        return response.status(404).json({ error: 'Produto não encontrado.' });
    }

    return response.status(200).json({ success: 'Produto removido com sucesso' });
});

module.exports = usersRouter;