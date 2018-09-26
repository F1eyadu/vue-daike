const uuidv1 = require('uuid/v1')
const Course_model = require('./../model/course')
const User_model = require('./../model/user')
const formatData = require('./../utils/formatDate')

// 获取所有课程
const getCourse = async (ctx, next) => {
    const req = ctx.request.body
    const courses = await Course_model.find({
        status: req.status
    }, { _id: 0 })
    if (courses) {
        ctx.status = 200
        ctx.body = {
            code: 1,
            msg: courses
        }
    } else {
        ctx.status = 200
        ctx.body = {
            code: 0,
            msg: '参数错误'
        }
    }
}

// 收藏
const collectCourse = async (ctx, next) => {
    const req = ctx.request.body
    const userId = req.userId
    const courseId = req.courseId

    if (!userId || !courseId) {
        ctx.status = 200
        ctx.body = {
            code: 0,
            msg: '收藏失败!'
        }
        return
    }
    const result = await User_model.findOne({
        userId
    }, {
            collections: 1,
            _id: 0
        })

    const collections = result.collections
    ctx.status = 200
    if (collections.includes(courseId)) {
        ctx.body = {
            code: 1,
            msg: '已收藏该课程'
        }
        return
    }
    collections.push(courseId)
    await User_model.update({
        userId: req.userId
    }, {
            $set: { collections }
        })
    ctx.body = {
        code: 1,
        msg: '收藏成功!'
    }
}

// 代课

const substituteCourse = async (ctx, next) => {
    const req = ctx.request.body
    ctx.status = 200

    if (!req.userId || !req.userName) {
        ctx.body = {
            code: 0,
            msg: '缺少重要参数'
        }
        return
    }
    const course = req.course
    if (req.userId === course.publisher) {
        ctx.body = {
            code: 0,
            msg: '发布者和代课者是同一个人'
        }
        return
    }

    const receiver = await Course_model.findOne({
        id: course.id
    }, {
            receiver: 1
        })

    if (receiver.receiver) {
        ctx.body = {
            code: 0,
            msg: '很遗憾,被人捷足先登了!'
        }
        return
    }
    const result = await Course_model.update({
        id: course.id
    }, {
            $set: {
                status: 'received',
                closeTime: formatData(new Date()),
                receiver: req.userId,
                receiverName: req.userName
            }
        })

    if (result.nModified) {
        ctx.body = {
            code: 1
        }
    } else {
        ctx.body = {
            code: 0,
            msg: '代课失败'
        }
    }

}

// 发布课程

const publishCourse = async (ctx, next) => {
    const req = ctx.request.body
    const uuid = uuidv1()
    ctx.status = 200

    if (!req.publisher || !req.schoolId || !req.courseTime || !req.coursePlace) {
        ctx.body = {
            code: 0,
            msg: '缺少必要参数!'
        }
        return
    }

    req.id = uuid
    const result = await Course_model.create(req)
    if (result) {
        ctx.body = {
            code: 1,
            msg: '发布成功!'
        }
    } else {
        ctx.body = {
            code: 0,
            msg: '发布失败!'
        }
    }
}

// 获取我发布的 | 代课 | 收藏的课程

const getCourseByType = async (ctx, next) => {
    const req = ctx.request.body
    const userId = req.userId
    const type = req.type

    ctx.status = 200
    if (!userId || !type) {
        ctx.body = {
            code: 0,
            msg: '缺少必要参数！'
        }
        return
    }

    let courses = []
    if (type == 'publish') {
        courses = await Course_model.find({
            publisher: userId
        }, { _id: 0 })
    } else if (type == 'substitute') {
        courses = await Course_model.find({
            receiver: userId
        }, { _id: 0 })
    } else {
        const result = await User_model.findOne({
            userId
        }, {
                collections: 1,
                _id: 0
            })

        const collections = result.collections

        for (collection of collections) {
            const course = await Course_model.findOne({
                id: collection
            }, { _id: 0 })
            courses.push(course)
        }
    }

    ctx.body = {
        code: 1,
        data: courses
    }
}


module.exports = {
    getCourse,
    collectCourse,
    substituteCourse,
    publishCourse,
    getCourseByType
}