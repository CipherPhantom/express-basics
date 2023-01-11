const express = require('express');
const app = express();
let { people } = require('./data')

app.use(express.static('./methods-public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.post('/login', (req, res) => {
    const { name } = req.body
    if (name) {
        return res.status(200).send(`<h1>Hello ${name}`)
    }
    res.status(401).send('Please Provide Credentials')
})

app.get('/api/people', (req, res) => {
    res.status(200).json({success: true, data: people})
})

app.post('/api/people', (req, res) => {
    const { name } = req.body
    if (!name) {
        res.status(400).json({success: true, message: 'please provide name value'})
    }
    res.status(201).send({success: true, person: name})
})

app.post('/api/people/postman', (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({success: true, message: 'please provide name value'})
    }
    const ids = people.map((person) => person.id)
    res.status(201).send({success: true, data: [...people, {id: Math.max(...ids)+1,name}]})
})

app.put('/api/people/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const person = people.find(person => person.id === Number(id));
    if (!person) {
       return res.status(404).json({success: true, message: `no person with is ${id}`})
    }
    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name
        } return person
    })
    res.status(200).json({success: true, data:newPeople})
})

app.delete('/api/people/:id', (req, res) => {
    const { id } = req.params;
    const person = people.find(person => person.id === Number(id));
    if (!person) {
        return res.status(404).json({success: true, message: `no person with is ${id}`})
     }
    const newPeople = people.filter((person) => person.id !== parseInt(id))
    res.status(200).json({success: true, data:newPeople})
})

app.get('*', (req, res) => {
    res.status(404).send('Resource Does Not Exist')
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000.....')
})