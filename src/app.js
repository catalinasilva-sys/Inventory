const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}))

app.set('port', process.env.PORT || 5000)

app.use('/api/products', require('#routes/products.routes'))
app.use('/api/users', require('#routes/user.routes'))

module.exports = app