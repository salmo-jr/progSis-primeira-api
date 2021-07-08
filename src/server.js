var express = require('express');
var router = require('../src/routes');
var app = express();

app.use(express.json());
app.use(router);

app.listen(3333, () => {
    console.log('Server started on port 3333!');
});