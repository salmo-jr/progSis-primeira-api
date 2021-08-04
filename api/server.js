const { request, response } = require('express');
const express = require('express');
const router = require('../src/routes');
const app = express();

app.use(express.json());
app.use(router);

app.get('/test', (request, response) => {
    return response.json({ success: true });
});

app.listen(3333, () => {
    console.log('Server started on port 3333!');
});