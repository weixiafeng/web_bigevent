const db = require('../db/index')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const config=require('../config')
exports.regUser=(req,res)=>{
    const userinfo=req.body
    // if(!userinfo.username||!userinfo.password){
    //     return res.send({
    //         status:1,
    //         message:'用户名或密码为空'
    //     })
    // }
    const sqlStr = 'select * from bigevent_users where username=?'

    //注意：请勿命第二个参数为res，会覆盖什么的res
    db.query(sqlStr,userinfo.username,function(err,results){
        if(err){
            //return res.send({status:1,message:err.message})
            return res.mes(err)
        }
        if(results.length>0){
            //return res.send({status:1,message:"用户名已存在"})
            return res.mes('用户名已存在')
        }

        userinfo.password=bcrypt.hashSync(userinfo.password,10)
        const sql='insert into bigevent_users set ?'
        db.query(sql,{username:userinfo.username,password:userinfo.password},function(err,results){
            if(err){
                //return res.send({status:1,message:err.message})
                return res.mes(err)
            }
            if(results.affectedRows !== 1){ 
                return res.mes('注册用户失败，请稍后再试！')
            }
            // 注册成功
            //res.send({ status: 0, message: '注册成功！' })
            res.mes('注册成功！', 0)
        })
    })

    
}

exports.login=(req,res)=>{
    const userinfo=req.body
    const sql=`select * from bigevent_users where username=?`
    db.query(sql,userinfo.username,(err,results)=>{
        if(err)return res.mes(err)
        if(results.length!==1)return res.mes('登录失败，用户不存在！')
        const compareResult=bcrypt.compareSync(userinfo.password,results[0].password)
        if(!compareResult)return res.mes('用户密码有误')
        //在服务器端生成 Token 的字符串
        const user={...results[0],password:'',user_pic:''}
        // 对用户的信息进行加密，生成 Token 字符串
        const tokenStr=jwt.sign(user,config.jwtSecretKey,{ expiresIn: config.expiresIn })
        // 将 Token 响应给客户端
        res.send({
            status: 0,
            message: '登录成功！',
            token:  'Bearer ' + tokenStr,
        })
    })

}