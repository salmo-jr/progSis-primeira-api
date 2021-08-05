const express = require('express');
const router = require('../src/routes');
const app = express();

app.use(express.json());
app.use(router);

app.get('/', (request, response) => {
    return response.json({ success: true });
});

app.listen(process.env.PORT || 3333, () => {
    console.log('Server started!');
});

module.exports = app;