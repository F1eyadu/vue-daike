const mongoose = require('mongoose')

const passWordSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    hash: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('password', passWordSchema, 'password')