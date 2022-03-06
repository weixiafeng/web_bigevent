const res = require('express/lib/response')
const db=require('../db/index')
const bcrypt=require('bcryptjs')
// 获取用户基本信息的处理函数
exports.getUserInfor = (req,res)=>{
    const sql = `select id, username, nickname, email, user_pic from bigevent_users where id=?`
    //当 express-jwt 这个中间件配置成功之后，即可在那些有权限的接口中，使用 req.user 对象，来访问从 JWT 字符串中解析出来的用户信息了
    db.query(sql,req.user.id,(err,results)=>{
        // 1. 执行 SQL 语句失败
        if(err)return res.mes(err)
        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if(results.length!==1)return res.mes('获取用户信息失败！')
        // 3. 将用户信息响应给客户端
        res.send({
            status:0,
            message:'成功获取用户信息！',
            data:results[0]
        })
    })
}

//更新用户基本信息的处理函数
exports.updateUserInfor=(req,res)=>{
    const sql = `update bigevent_users set ? where id=?`
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if(err)return res.mes(err)
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.mes('修改用户信息失败！')
        // 修改用户信息成功
        return res.mes('修改用户信息成功！', 0)
      })
    
}
exports.updatePassword=(req,res)=>{
    // 定义根据 id 查询用户数据的 SQL 语句
    const sql = `select * from bigevent_users where id=?`
    db.query(sql,req.user.id,(err,results)=>{
        // 执行 SQL 语句失败
        if (err) return res.mes(err)
        //检查指定 id 的用户是否存在
        if (results.length !== 1) return res.mes('用户不存在！')
        //compareSync(提交的密码，数据库中的密码) 函数的返回值为布尔值，true 表示密码正确，false 表示密码错误
        const compareResult=bcrypt.compareSync(req.body.oldPassword,results[0].password)
        if (!compareResult) return res.mes('原密码错误！')

        // 定义更新用户密码的 SQL 语句
        const sql = `update bigevent_users set password=? where id=?`
        // 对新密码进行 bcrypt 加密处理
        const newPassword = bcrypt.hashSync(req.body.newPassword, 10)
        // 执行 SQL 语句，根据 id 更新用户的密码
        db.query(sql, [newPassword, req.user.id], (err, results) => {
            // SQL 语句执行失败
            if (err) return res.cc(err)
            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.mes('更新密码失败！')
            // 更新密码成功
            res.mes('更新密码成功！', 0)
        })
    })
    
}
// 更新用户头像的处理函数
exports.updateAvatar=(req,res)=>{
    const sql = 'update bigevent_users set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.mes(err)
      
        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.mes('更新头像失败！')
      
        // 更新用户头像成功
        return res.mes('更新头像成功！', 0)
    })
}