const express = require('express');
const app = express();

function logger (req, res, next) {
    const method = req.method;
    const url = req.url;
    const year = new Date().getFullYear();
    console.log(method, url, year);
    // res.send('Testing.....') --- Terminate
    next() // or parse to next  
}

// req => middleware => res
app.get('/', logger, (req, res) => {
    res.send('<h1>Home Page</h1>')
})

app.get('/about', logger, (req, res) => {
    res.send('<h1>About Page</h1>')
})

app.get("*", (req, res) => {
    res.send('<h1>Resource Does Not Exist')
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000.......')
})