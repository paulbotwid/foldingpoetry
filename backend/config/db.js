const mongoose = require('mongoose')

const mongo_uri = process.env.ATLAS_URI

console.log("process.env in db.js :")
console.log(process.env)

const connectDB = async () => {
    try {
        const connection = mongoose.connect(mongo_uri)
        console.log(`Mongo DB connected: ${connection.connection}`)
    } catch(error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB