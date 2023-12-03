const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const {MONGODB_URI} = require('./utils/config')

const blogRouter = require('./controllers/blogs')

mongoose.set('strictQuery', false)

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


app.use('/api/blogs', blogRouter)

module.exports = app