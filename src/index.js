const express = require('express');
const app = express();

app.get('/produtos', (request, response) => {
    return response.json({ mensagem: 'Olá World!' });
});

app.listen(3333);