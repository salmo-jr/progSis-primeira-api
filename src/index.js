const { v4 } = require('uuid');
const express = require('express');
const app = express();

app.use(express.json());

const products = [];

app.get('/produtos', (request, response) => {
    return response.json(products);
});

app.post('/produtos', (request, response) => {
    const { type, description } = request.body;
    const product = {
        id: v4(),
        type: type,
        description: description
    }
    
    products.push(product);
    return response.json(product);
});

app.put('/produtos/:id', (request, response) => {
    const { id } = request.params;
    console.log('ID: ', id);
    return response.json(['Pizza de Frango', 'Cerveja', 'Suco']);
});

app.delete('/produtos/:id', (request, response) => {
    const { id } = request.params;
    console.log('ID: ', id);
    return response.json(['Pizza de Frango', 'Cerveja']);
});

app.listen(3333);