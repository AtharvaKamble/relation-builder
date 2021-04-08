const express = require('express')
const relationRouter = require('../router/relation')
const cors = require('cors')
const path = require('path')

const app = express()

// console.log(path)
const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))
app.use(express.json())
app.use(cors())
app.use(relationRouter)

module.exports = app
