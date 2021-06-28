const { v4 } = require('uuid');
const express = require('express');
const { Product } = require('../models');
const { Op } = require('sequelize');
const app = express();

app.use(express.json());

const products = [];

app.get('/products', async (request, response) => {
    try {
        const products = await Product.findAll();
        response.status(200).json(products);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
    return response.json(products);
});

app.get('/products/search', async (request, response) => {
    const { text } = request.query;
    try {
        const products = await Product.findAll({
            where: {
                description: {[Op.substring]: text }
            }
        });
        response.status(200).json(products);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

app.post('/products', async (request, response) => {
    const product = request.body;
    try {
        await Product.create(product);
        return response.status(201).json(product);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
});

app.put('/products/:id', async (request, response) => {
    const { id } = request.params;
    const product = request.body;
    const affectedRows = await Product.update(product, {
        where: {
            id
        }
    });
    if (affectedRows < 1) {
        return response.status(404).json({ error: 'Produto não encontrado.' });
    }

    return response.status(200).json(product);
});

app.delete('/products/:id', async (request, response) => {
    const { id } = request.params;

    const affectedRows = await Product.destroy({
        where: {
            id
        }
    });
    
    if (affectedRows < 1) {
        return response.status(404).json({ error: 'Produto não encontrado.' });
    }
    return response.status(200).json({ message: `O produto ${id} foi removido com sucesso` });
});

app.listen(3333);