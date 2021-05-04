require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person')

morgan.token('obj', res => {
    // console.log(res)
    return JSON.stringify(res.body)
})

const app = express();

app.use(express.static('build'))
app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :obj'));

const errorHandler = (error, req, res, next) => {
    console.error(error.name, error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({error: 'malformed id'})
    } else if (error.name === 'ValidationError') {
        return res.status(400).send({error: error.message})
    }

    next(error);
}



app.use(function (err, req, res, next) {
  console.error("WTF2", err.stack)
  res.status(500).send('Something broke!')
})

app.get("/" , (req, res) => {
    res.send("<h1>Phonebook</h1>")
})

app.get("/info", (req, res, next) => {
    Person.find({}).then(persons => {
        res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`)
    }).catch(error =>  next(error))
});

app.get("/api/persons", (req, res, next) => {
    Person.find({}).then(persons => {
        res.json(persons)
    }).catch(error => next(error))
});

app.post("/api/persons", (req, res, next) => {
    const person = req.body

    const newPerson = new Person({
        name: person.name,
        number: person.number
    })
    console.log(newPerson, 1)
    newPerson.save().then(result => {
        console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`)
        res.json(result)
    }).catch(error => next(error))

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

app.get("/api/persons/:id", (req, res, next) => {
    // const id = Number(req.params.id)
    // const person = persons.find(person => person.id === id)
    Person.findById(req.params.id).then(person => {
        if(person){
            res.json(person);
        }else{
            res.status(404).end();
        }
    }).catch(error => next(error))

});

app.put("/api/persons/:id", (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findOneAndUpdate({_id: req.params.id}, person, { new: true } )
          .then(updatedPerson => {
              res.json(updatedPerson)
          })
          .catch(error => {
              next(error)
          })
})

app.delete("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
          .then(result => {
              res.status(204).end()
          })
          .catch(error => {
              // console.log("WTF", )
              next(error)
          })
//     const id = Number(req.params.id)
//     persons = persons.filter(person => person.id !== id)
//     res.status(204).end()
});

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
