const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors')
const pamRoute = require('./route/route')
const db = require('./db/indexdb')

dotenv = require('dotenv')

// dotenv.config()


const app = express()
const pamPort = 8000

app.use(express.urlencoded({ extended: true}))
// app.use(cors())
app.use(express.json())
app.use("/",pamRoute)

db.on("error",console.error.bind(console, "MongoDB connection error"))
db.on("once",console.log.bind(db,"YAY!! connected"))

app.listen(pamPort, () => console.log(`server running on port ${pamPort}`))