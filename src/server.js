require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const handler = require('./comman/handle.com')
const app = express()

const PORT = process.env.PORT || 5020

// mongoose connection
require('./config/mongoose.connection')()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', require('./routes/index'))

app.use(handler.invalidRoute, handler.errorHandler)


app.listen(PORT, () => console.log('Server running on', PORT))
