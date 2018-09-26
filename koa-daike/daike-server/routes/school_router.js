const Router = require('koa-router')
const router = new Router()
const school_Controller = require('./../app/controllers/school_controller')

router.post('/school', school_Controller.searchSchoolByName)

module.exports = router
