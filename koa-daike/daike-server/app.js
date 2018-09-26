const Koa = require('koa')
const config = require('./config')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const app = new Koa()

mongoose.connect(config.db,{useNewUrlParser:true}, (err, result) => {
    if(err) console.log('连接数据库失败')
    else console.log('连接数据库成功')
})

app.use(bodyParser())

const user_router = require('./routes/user_router')
const course_router = require('./routes/course_router')
const school_routre = require('./routes/school_router')



app.use(user_router.routes()).use(user_router.allowedMethods())
app.use(course_router.routes()).use(course_router.allowedMethods())
app.use(school_routre.routes()).use(school_routre.allowedMethods())

app.listen(config.port)