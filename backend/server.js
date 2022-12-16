const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userModel = require('./models/users')
const poemModel = require('./models/poems')

const dotenv = require('dotenv').config() 

const app = express()
const port = process.env.PORT || 3000
const mongo_uri = process.env.ATLAS_URI

app.use(cors())
app.use(express.json())

mongoose.connect(mongo_uri)
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log("db connection established")
})

app.get("/getPoems", (req, res)=>{
    poemModel.find({},(error, result)=> {
        if(error) {
            res.json(error)
        } else {
            res.json(result)
        }
    })
})

app.post("/createPoem", async (req, res)=>{
    const poem = req.body
    const newPoem = new poemModel(poem)
    await newPoem.save()

    res.json(poem)
})


app.listen(
    port, ()=>{
        console.log(`Server started on part ${port}`)
    }
)