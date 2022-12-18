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

mongoose.connect(
    mongo_uri,
    (err) => {
        if(err) console.log(err) 
        else console.log("mongdb is connected");
    }   
)
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

app.put("/updatePoem", async (req, res)=>{
    const id = req.body.id
    console.log("updating id: " + id)
    try {
        await poemModel.findOne({id: id}, (err, foundPoem)=>{
            foundPoem.lines = req.body.lines
            foundPoem.isFinished = req.body.isFinished
            foundPoem.save()
            res.send("updated poem")
        })
    } catch(err) {
        console.log("error: " + err)
    }
})

app.delete("/deletePoem/:id", async (req, res)=>{
    const id = req.params.id
    console.log("deleting id: " + id)
    await poemModel.findOneAndDelete({id: id}).exec()
    res.send("deleted")
})


app.listen(
    port, ()=>{
        console.log(`Server started on part ${port}`)
    }
)