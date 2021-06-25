const { v4 } = require('uuid');
const express = require('express');
const { products } = require('./products');
const app = express();

app.use(express.json());

app.get('/products', (request, response) => {
    return response.json(products);
});

/* app.get('/products/search', (request, response) => {
    const { text } = request.query;
    const results = products.filter(p => p.description.length > 6);

    return response.json(results);
}); */

app.post('/products', (request, response) => {
    const { type, description } = request.body;
    const product = {
        id: v4(),
        type: type,
        description: description
    }
    
    products.push(product);
    return response.json(product);
});

app.put('/products/:id', (request, response) => {
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

app.delete('/products/:id', (request, response) => {
    const { id } = request.params;

    const index = products.findIndex(p => p.id === id);
    if (index < 0) {
        return response.json({ error: 'Produto não encontrado' });
    }

    products.splice(index, 1);
    return response.json({ message: `O produto ${id} foi removido com sucesso` });
});

app.listen(3333);