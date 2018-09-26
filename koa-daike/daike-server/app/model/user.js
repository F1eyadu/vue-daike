const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    account: {
        type: String
    },
    userName: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    headerImg: {
        type: String
    },
    studentId: {
        type: String
    },
    school: {
        type: String
    },
    schoolId: {
        type: String
    },
    provinceId: {
        type: Number
    },
    major: {
        type: String
    },
    college: {
        type: String
    },
    wechat: {
        type: String
    },
    qq: {
        type: String
    },
    collections: {
        type: Array
    }
})

module.exports = mongoose.model('user', userSchema, 'user')