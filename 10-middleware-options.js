const express = require('express');
const morgan = require('morgan');
const app = express();
const logger = require('./logger')
const authorize = require('./authorize');

// multiple callbacks are passed in an array either in use or in the request after the url
// options    my cb  / express's cb  /  third party
// app.use([logger, authorize]) // path eg. '/api' argument before callback
// app.use(express.static('./public'))
app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>')
})

app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1>')
})

app.get('/api/products', (req, res) => {
    res.send('<h1>Products Page</h1>')
})

app.get('/api/items', (req, res) => {
    res.send('<h1>Items Page</h1>')
})

app.get("*", (req, res) => {
    res.send('<h1>Resource Does Not Exist')
})

app.listen(5000, () => {
    console.log('Server listening on port 5000......');
})