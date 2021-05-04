const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')


const url = process.env.MONGODB_URI;
// console.log(connectiongurl)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        .then(result => {
            console.log("connected to MongoDB")
        })
        .catch(error => {
            console.log('error connecting to MongoDB:', error.message)
        });

const personSchema = new mongoose.Schema({
    name: { type: String, minlength: 3, required: true, unique: true },
    number: { type: Number, minlength: 8,
              validate: {
                  validator: function(v) {
                      return /\d{8}/.test(v);
                  },
                  message: props => `${props.value} is not a valid phone number`
              },
              required: true}

})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person", personSchema)
