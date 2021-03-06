const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstackopen-phonebook:${password}@cluster0.cm2nm.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

switch(process.argv.length){
case 3:
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connecton.close()
    })
    break
case 5:
    const name = process.argv[3]
    const number = process.argv[4]
    const newPerson = new Person({
        name,
        number
    })
    newPerson.save().then(result => {
        console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`)
        mongoose.connection.close()
    })
    break
default:
    console.log('Wrong number of arguments')
    break
}
