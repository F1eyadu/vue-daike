const mongoose = require('mongoose')

const schoolSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    provinceId: {
        type: String
    },
    level:{
        type: String
    },
    abbreviation: {
        type: String
    },
    city: {
        type: String
    }
})

module.exports = mongoose.model('school', schoolSchema, 'school')