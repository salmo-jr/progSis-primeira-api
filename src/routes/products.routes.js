var express = require('express');
const { Product } = require('../../models');
const { products } = require('../products');
var productsRouter = express.Router();

productsRouter.use(express.json());

productsRouter.get('/', (request, response) => {
    return response.json(products);
});

productsRouter.get('/search', (request, response) => {
    const { text } = request.query;
    if (text) {
        const results = products.filter(p => p.description.toUpperCase().includes(text.toUpperCase()));
        return response.json(results);
    } else {
        return response.json(products);
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

productsRouter.put('/:id', (request, response) => {
    const { id } = request.params;
    const { type, description } = request.body;
    const index = products.findIndex(p => p.id === id);

    if (index < 0) {
        return response.json({ error: 'Produto não encontrado.' });
    }

    const product = {
        id: id,
        type: type,
        description: description,
    }
    products[index] = product;

    return response.json(product);
});

productsRouter.delete('/:id', (request, response) => {
    const { id } = request.params;

    const index = products.findIndex(p => p.id === id);
    if (index < 0) {
        return response.json({ error: 'Produto não encontrado' });
    }

    products.splice(index, 1);
    return response.json({ message: `O produto ${id} foi removido com sucesso` });
});

module.exports = productsRouter;