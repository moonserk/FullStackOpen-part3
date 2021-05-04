require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person')

morgan.token('obj', res => {
    // console.log(res)
    return JSON.stringify(res.body)
})
console.log(Person)
const app = express();

app.use(express.json());
app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :obj'));


app.get("/" , (req, res) => {
    res.send("<h1>Phonebook</h1>")
})

app.get("/info", (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`)
})

app.get("/api/persons", (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    });
});

app.post("/api/persons", (req, res) => {
    const person = req.body
    console.log(person)
    if(person.name === undefined){
        return res.status(400).json({error: 'content missing'})
    }

    const newPerson = new Person({
        name: person.name,
        number: person.number
    })
    console.log(newPerson, 1)
    newPerson.save().then(result => {
        console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`)
        res.json(result)
    });

    // if(!person.name || !person.number){
    //     return res.status(400).json({
    //         error: 'The name or number is missing'
    //     })
    // }

    // const samePerson = persons.find(p => p.name === person.name)
    // if(samePerson){
    //     return res.status(400).json({
    //         error: 'The name already exists in the phonebook'
    //     })
    // }

    // person.id = Math.floor(Math.random() * 10000000000000);
    // persons = persons.concat(person)

    // res.json(person)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    Person.findById(req.params.id).then(person => {
        if(person){
            res.json(person);
        }else{
            res.status(404).end();
        }
    })

});

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
});

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
