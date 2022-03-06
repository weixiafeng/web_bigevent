// 导入 express
const express=require('express')
// 创建路由对象
const router=express.Router()

const user_handler=require('../router_handler/user')
// 1. 导入验证表单数据的中间件
const expressJoi=require('@escook/express-joi')
const {reg_login_verify}=require('../message_verify/user')
// 导入用户路由处理函数对应的模块
router.post('/register',expressJoi(reg_login_verify),user_handler.regUser)
router.post('/login',expressJoi(reg_login_verify),user_handler.login)

module.exports=router