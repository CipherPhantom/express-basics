const express = require('express');
const app = express();
const logger = require('./logger')
const authorize = require('./authorize');

app.use([logger, authorize]) // path eg. '/api' argument before callback

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>')
})

app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1>')
})

app.get('/api/products', (req, res) => {
    res.send('<h1>Products Page</h1>')
})

app.get('/api/items', [logger, authorize], (req, res) => {
    res.send('<h1>Items Page</h1>')
})

app.get("*", (req, res) => {
    res.send('<h1>Resource Does Not Exist')
})

app.listen(5000, () => {
    console.log('Server listening on port 5000......');
})