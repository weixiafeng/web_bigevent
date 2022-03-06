//导入express
const express=require('express')
// 创建路由对象
const router=express.Router()
// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const {update_userinfor_verify}=require('../message_verify/user')
const {update_password_verify}=require('../message_verify/user')
const {update_avatar_verify}=require('../message_verify/user')
// 导入用户信息的处理函数模块
const userinfor_handler = require('../router_handler/userinfor')

router.get('/userinfor',userinfor_handler.getUserInfor)
router.post('/userinfor',expressJoi(update_userinfor_verify),userinfor_handler.updateUserInfor)
router.post('/updatepwd',expressJoi(update_password_verify),userinfor_handler.updatePassword)
router.post('/update/avatar',expressJoi(update_avatar_verify),userinfor_handler.updateAvatar)
// 向外共享路由对象
module.exports=router