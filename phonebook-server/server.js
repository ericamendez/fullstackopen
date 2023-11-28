const express = require('express')
const app = express()
require('dotenv').config();
const PORT = process.env.PORT || 3000
const morgan = require('morgan');
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(cors())
// Define a custom token for logging request body
morgan.token('req-body', (req) => {
    return JSON.stringify(req.body);
});
// Use the custom token in the log format
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));
app.use(express.json())

app.get('/', (request, response) => {
    console.log(request.body);
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    const date = new Date()
    const dateRes = `${date.toDateString()} ${date.toLocaleDateString()} ${date.toGMTString()}`
    const infoRes = `Phonebook has info for ${data.length} people`
    const send = `<p>${infoRes}</p><p>${dateRes}</p>`
    response.send(send)
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(person => {
            if(person){
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})

app.post('/api/persons', async (req, res) => {
    const body = req.body

    if (!body.name) {
        console.log('eroeeeeeee');
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number || false,
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })

})

app.delete('/api/persons/:id', async (req, res) => {
    try {
        let deletedPerson = await Person.findByIdAndDelete(req.params.id)

        if (!deletedPerson) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.send(`person ${deletedPerson.name} has been deleted`)
    } catch (err) {
        console.error(err);
        res.send(err)
    }

})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})