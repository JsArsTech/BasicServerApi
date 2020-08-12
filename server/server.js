const fs = require('fs').promises;
const path = require('path');
const express = require('/usr/lib/node_modules/express');
const bodyParser = require('/usr/lib/node_modules/body-parser');
const cookieParser = require('cookie-parser');
const api = require('./api');
// const auth = require('./auth');
const auth = require('./auth-jwt');
const middleware = require('./middleware');

const port = process.env.PORT || 1337;

const app = express();

app.use(middleware.cors);

app.use(bodyParser.json()); 

app.use(cookieParser());

//auth.setMiddleware(app);

app.post('/login', auth.authenticate, auth.login);

app.get('/products', api.listProducts);

app.get('/products/:id', api.getProduct);

app.post('/products', auth.ensureAdmin, api.createProduct);

app.put('/products/:id', auth.ensureAdmin, api.editProduct);

app.delete('/products/:id', auth.ensureAdmin, api.deleteProduct);

app.get('/orders', auth.ensureAdmin, api.listOrders);

app.post('/orders', auth.ensureAdmin, api.createOrder);

// TODO
// app.use(middleware.handleValidationError); 

app.use(middleware.handleError);

app.use(middleware.notFound);


console.dir(api);
app.listen(port, () => console.log(`Server listening on port ${port}`));

