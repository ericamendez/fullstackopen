const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const personsRouter = require('./controllers/persons')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const morgan = require('morgan')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
// Define a custom token for logging request body
morgan.token('req-body', (req) => {
    return JSON.stringify(req.body)
})
// Use the custom token in the log format
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))
app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)

app.use('/api/notes', personsRouter)

// this has to be the last loaded middleware.
app.use(middleware.errorHandler)


app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})