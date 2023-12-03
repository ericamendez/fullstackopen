const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

personsRouter.get('/info', (req, res) => {
    const date = new Date()
    const dateRes = `${date.toDateString()} ${date.toLocaleDateString()} ${date.toGMTString()}`

    const person = Person.find({}).then(data => {
        const infoRes = `Phonebook has info for ${data.length} people`
        const send = `<p>${infoRes}</p><p>${dateRes}</p>`
        res.send(send)
    })
})

personsRouter.get('/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(err => {
            console.log(err)
            // res.status(400).send({ error: 'malformatted id' })
            return next(err)
        })
})

personsRouter.post('/', async (req, res, next) => {
    const body = req.body

    if (!body.name) {
        console.log('eroeeeeeee')
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
    }).catch(error => next(error))

})

personsRouter.put('/:id', (req, res, next) => {
    const { name, number } = req.body

    Person.findByIdAndUpdate(req.params.id, { name, number },
        { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

personsRouter.delete('/:id', async (req, res) => {
    try {
        let deletedPerson = await Person.findByIdAndDelete(req.params.id)

        if (!deletedPerson) {
            return res.status(404).json({ message: 'Item not found' })
        }

        res.send(`person ${deletedPerson.name} has been deleted`)
    } catch (err) {
        console.error(err)
        res.send(err)
    }

})


module.exports = personsRouter