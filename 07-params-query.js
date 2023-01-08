const express = require('express');
const {products, people}= require('./data');
const app = express()

app.get('/', (req, res) => {
    res.status(200).send(
        '<h1> Home Page</h1><ul><a href="api/products">products</a></ul><ul><a href="api/people">people</a></ul>')
})

app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const { id, name, image } = product;
        return { id, name, image }
    });
    res.status(200).json(newProducts)
})

app.get('/api/products/:productID', (req, res) => {
    const { productID } = req.params;
    const singleProduct = products.find((product) => product.id === parseInt(productID))
    if (!singleProduct) {
        return res.status(404).json({error: 'Product Does Not Exist'})
    } 
    return res.status(200).json(singleProduct)
})

app.get('/api/people', (req, res) => {
    res.status(200).json(people)
})

app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
    console.log(req.params);
})

app.get('/api/v1/query', (req, res) => {

    const {search, limit} = req.query;
    let sortedProducts = [...products];
    if (search) {
        sortedProducts = sortedProducts.filter((product) => product.name.startsWith(search))
    } 
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    if (sortedProducts.length < 1) {
        return res.status(200).json({ success: true, data: []})
    }
    res.status(200).json(sortedProducts)
    // console.log(req.query);
})

app.listen(5000, () => {
    console.log('Server listening on port 5000......');
})