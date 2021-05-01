const express = require('express');
const morgan = require('morgan');

morgan.token('obj', res => {
    console.log(res)
    return JSON.stringify(res.body)
})

const app = express()
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :obj'));

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
];


app.get("/info", (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`)
})

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.post("/api/persons", (req, res) => {
    const person = req.body

    if(!person.name || !person.number){
        return res.status(400).json({
            error: 'The name or number is missing'
        })
    }

    const samePerson = persons.find(p => p.name === person.name)
    if(samePerson){
        return res.status(400).json({
            error: 'The name already exists in the phonebook'
        })
    }

    person.id = Math.floor(Math.random() * 10000000000000);
    persons = persons.concat(person)

    res.json(person)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        res.json(person);
    }else{
        res.status(404).end();
    }
});

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
});

const PORT = 3005;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
