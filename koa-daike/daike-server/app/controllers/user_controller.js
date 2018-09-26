const config = require('./../../config')
const passport = require('./../utils/passport')
const User_model = require('./../model/user')
const Password_model = require('./../model/password')
const uuid = require('uuid/v1')


// 登录
const login = async(ctx, next) => {
    const req = ctx.request.body
    const user = await User_model.findOne({
        account: req.account
    },{
        __v: 0,
        _id: 0
    })
    console.log(user)
    if(!user) {
        ctx.status = 200
        ctx.body = {
            code: 0,
            msg: '账号或密码错误!'
        }
        return
    }

    const userId = user.userId

    const pass = await Password_model.findOne({
        userId
    },{
        hash: 1
    })
    const match = await passport.validata(req.password, pass.hash)
    ctx.status = 200
    if(match) {
        ctx.body = {
            code: 1,
            msg: '登录成功',
            data: user
        }
        return;
    }
    ctx.body = {
        code: 0,
        msg: '用户名或密码错误'
    }
}

// 注册并登录

const  register = async(ctx, next) => {
    let req = ctx.request.body
    const user = await User_model.findOne({
        account: req.account
    })
    ctx.status = 200
    if(user) {
        ctx.body = {
            code: 0,
            mes: '该用户已注册!'
        }
        return
    }
    
    // 插入新的用户
    const userId = uuid()
    const newUser = await User_model.create({
        userId,
        account: req.account
    })

    if(newUser) {
        const hash = await passport.encrypt(req.password, config.saltTimes)
        const result = await Password_model.create({
            userId,
            hash
        })
        if(result) {
            ctx.body = {
                code: 1,
                msg: '注册成功',
                data: {
                    userId: newUser.userId,
                    account: newUser.account
                }
            }
        }
    }else{
        ctx.body = {
            code: 0,
            msg: '注册失败'
        }
    }
}

// 更新个人信息

const updateUserInfo = async (ctx, next) => {
    const req = ctx.request.body
    const result =await User_model.updateOne({
        userId: req.userId
    },req)

    ctx.status = 200
    if(result.nModified == 1) {
        ctx.body = {
            code:1,
            msg:'保存成功'
        }
    }else{
        ctx.body = {
            code:1,
            msg:'保存失败'
        }
    }

}


module.exports = {
    login,
    register,
    updateUserInfo
}

