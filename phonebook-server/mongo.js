const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://erica:${password}@cluster0.kpe3q.mongodb.net/FSODatabase?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number,
})

if (process.argv.length <= 3) {
  console.log('give password as argument')
  Person
    .find({})
    .then(result => {
      result.forEach((person, i) => {
        i === 0 ? console.log('Phonebook:'): null
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
  // process.exit(1)
} else {

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook!`)
    mongoose.connection.close()
  })

  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
// node mongo.js yourpassword Anna 040-1234556
