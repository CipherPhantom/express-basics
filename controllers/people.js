
let { people } = require('../data')


const getPeople = (req, res) => {
    res.status(200).json({success: true, data: people})
}
const getPerson = (req, res) => {
    const {id} = req.params;
    const person = people.find(person => person.id === parseInt(id));
    if (!person) {
        return res.status(404).json({success: true, message: `no person with is ${id}`})
     }
    res.status(200).json({success: true, data:person})
}
const createPerson = (req, res) => {
    const { name } = req.body
    if (!name) {
        res.status(400).json({success: true, message: 'please provide name value'})
    }
    res.status(201).send({success: true, person: name})
}

const createPersonPostman = (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({success: true, message: 'please provide name value'})
    }
    const ids = people.map((person) => person.id)
    res.status(201).send({success: true, data: [...people, {id: Math.max(...ids)+1,name}]})
}

const updatePerson = (req, res) => {
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
}

const deletePerson = (req, res) => {
    const { id } = req.params;
    const person = people.find(person => person.id === Number(id));
    if (!person) {
        return res.status(404).json({success: true, message: `no person with is ${id}`})
     }
    const newPeople = people.filter((person) => person.id !== parseInt(id))
    res.status(200).json({success: true, data:newPeople})
}

module.exports = {
    getPeople,
    getPerson,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson
}