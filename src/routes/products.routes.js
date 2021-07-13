const express = require('express');
const { Op } = require('sequelize');
const { Product } = require('../../models');
const productsRouter = express.Router();

productsRouter.use(express.json());

productsRouter.get('/', async (request, response) => {
    try {
        const result = await Product.findAll();
        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
});

productsRouter.get('/search', async (request, response) => {
    const { text } = request.query;
    let results;
    try {
        if (text) {
            results = await Product.findAll({
                where: { description: { [Op.substring]: text } }
            });
        } else {
            results = await Product.findAll();
        }
        return response.status(200).json(results);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
});

productsRouter.post('/', async (request, response) => {
    try {
        const prod = await Product.create(request.body);
        return response.status(201).json(prod);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
});

productsRouter.put('/:id', async (request, response) => {
    const { id } = request.params;
    const product = request.body;
    
    const affectedRows = await Product.update(product, {
        where: { id },
    });
    
    if (affectedRows < 1) {
        return response.status(404).json({ error: 'Produto não encontrado.' });
    }

    return response.status(200).json({ success: 'Produto alterado com sucesso' });
});

productsRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;
    
    const affectedRows = await Product.destroy({
        where: { id },
    });
    
    if (affectedRows < 1) {
        return response.status(404).json({ error: 'Produto não encontrado.' });
    }

    return response.status(200).json({ success: 'Produto removido com sucesso' });
});

module.exports = productsRouter;