const mongoose = require('mongoose')

const emailGroupSchema = new mongoose.Schema({
    poemId: {
        type: String,
        required: true
    },
    emails: [String]
})

const emailGroupModel = mongoose.model("emailGroup", emailGroupSchema)
module.exports = emailGroupModel