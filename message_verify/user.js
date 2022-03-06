const joi=require('joi')
/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */
// 用户名的验证规则
const username=joi.string().alphanum().min(1).max(10).required()
// 密码的验证规则
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()

// 定义 id, nickname, emial 的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

//定义更新密码的password规则
const oldPassword=password
const newPassword=joi.not(joi.ref('oldPassword')).concat(password)

//定义更新用户头像的规则
const avatar=joi.string().dataUri().required()


exports.reg_login_verify={
  body:{
    username,
    password
  }
}
// 验证规则对象 - 更新用户基本信息
exports.update_userinfor_verify = {
  body: {
    id,
    nickname,
    email
  }
}
// 验证规则对象 - 重置密码
exports.update_password_verify={
  body:{
    oldPassword,
    newPassword//newPassword:joi.not(joi.ref('oldPassword')).concat(password)
  }
}
// 验证规则对象 - 更新头像
exports.update_avatar_verify={
  body:{
    avatar
  }
}