const express = require('express');
const { Product } = require('../models');
const { products } = require('./products');
const app = express();

app.use(express.json());

app.get('/products', async (request, response) => {
    try {
        const result = await Product.findAll();
        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
});

app.get('/products/search', (request, response) => {
    const { text } = request.query;
    if (text) {
        const results = products.filter(p => p.description.toUpperCase().includes(text.toUpperCase()));
        return response.json(results);
    } else {
        return response.json(products);
    }

    
});

app.post('/products', async (request, response) => {
    try {
        const prod = await Product.create(request.body);
        return response.status(201).json(prod);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
});

app.put('/products/:id', async (request, response) => {
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

app.delete('/products/:id', async (request, response) => {
    const { id } = request.params;
    
    const affectedRows = await Product.destroy({
        where: { id },
    });
    
    if (affectedRows < 1) {
        return response.status(404).json({ error: 'Produto não encontrado.' });
    }

    return response.status(200).json({ success: 'Produto removido com sucesso' });
});

app.listen(3333);