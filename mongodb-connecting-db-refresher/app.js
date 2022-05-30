const express = require('express');

const MongoRoute = require('./mongoose');

const app = express();

app.use(express.json());

app.post('/products', MongoRoute.createProduct );

app.get('/products', MongoRoute.getProducts );

app.listen(3000);