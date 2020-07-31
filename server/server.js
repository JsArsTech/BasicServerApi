const fs = require('fs').promises;
const path = require('path');
const express = require('/usr/lib/node_modules/express');
const bodyParser = require('/usr/lib/node_modules/body-parser');
const api = require('./api');
const middleware = require('./middleware');

const port = process.env.PORT || 1337;

const app = express();


app.use(middleware.cors);

app.use(bodyParser.json());

app.get('/products', api.listProducts);

app.get('/products/:id', api.getProduct);

app.post('/products', api.createProduct);

app.put('/products/:id', api.editProduct);

app.delete('/products/:id', api.deleteProduct);

app.get('/orders', api.listOrders);

app.post('/orders', api.createOrder);

app.use(middleware.handleError);

app.use(middleware.notFound);


console.dir(api);
app.listen(port, () => console.log(`Server listening on port ${port}`));

