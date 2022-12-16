const mongoose = require('mongoose')

const lineSchema = new mongoose.Schema({
    id: String, 
    location: String, 
    firstLine: String, 
    secondLine: String
})

const poemSchema = new mongoose.Schema({
    id: {
        type: String, 
        required: true
    },
    lines: [lineSchema],
    isFinished: {
        type: Boolean,
        required: true
    },
    targetLines: {
        type: Number, 
        required: true
    }
})

const poemModel = mongoose.model("poems", poemSchema)
module.exports = poemModel