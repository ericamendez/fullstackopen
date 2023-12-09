const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const {MONGODB_URI} = require('./utils/config')
const middleware = require('./utils/middleware')

const blogRouter = require('./controllers/blogs')

mongoose.set('strictQuery', false)
app.use(middleware.requestLogger)


mongoose.connect(MONGODB_URI)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

// app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



app.use('/api/blogs', blogRouter)

module.exports = app