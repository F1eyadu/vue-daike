const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String
    },
    publisher: {
        type: String,
        required: true
    },
    publisherHeader: {
        type: String
    },
    publisherName: {
        type: String
    },
    studentId: {
        type: String
    },
    schoolId: {
        type: String,
        required: true
    },
    school: {
        type: String
    },
    phone: {
        type: Number
    },
    publishTime: {
        type: String
    },
    closeTime: {
        type: String
    },
    remark: {
        type: String
    },
    receiver: {
        type: String
    },
    receiverName: {
        type: String
    },
    province: {
        type: String
    },
    college: {
        type: String
    },
    major: {
        type: String
    },
    courseName: {
        type: String
    },
    courseTime: {
        required: true,
        type: String
    },
    courseClass: {
        type: String
    },
    coursePlace: {
        required: true,
        type: String
    },
    reward: {
        type: Number
    },
    hasName: {
        type: Boolean
    },
    hasStuId: {
        type: Boolean
    },
    hasPhone: {
        type: Boolean
    },
    hasReward: {
        type: Boolean
    }
})

module.exports = mongoose.model('course', courseSchema, 'course')