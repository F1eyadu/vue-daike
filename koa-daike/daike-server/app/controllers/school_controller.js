const School_model = require('./../model/school')

const searchSchoolByName = async (ctx, next) => {
    const req = ctx.request.body
    const schools = await School_model.find({
        name: new RegExp(req.schoolName)
    },{_id:0}).limit(10)

    ctx.status = 200
    if(schools) {
        ctx.body = {
            code: 1,
            msg: schools
        }
    }else{
        ctx.body = {
            code: 0,
            msg: '没有查询到'
        }
    }
}

module.exports = {
    searchSchoolByName
}