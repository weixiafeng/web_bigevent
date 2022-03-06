const express=require('express')
const app=express()

const cors=require('cors')
app.use(cors())

app.use(express.urlencoded({extended:false}))
const joi = require('joi')

// 导入配置文件
const config = require('./config')
// 解析 token 的中间件
const expressJWT = require('express-jwt')
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证，参照文档
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms:['HS256']}).unless({ path: [/^\/api\//] }))

// 一定要在路由之前，封装 res.cc 函数
app.use((req,res,next)=>{
    res.mes=function(err,status=1){
        res.send({
            status,
            message:err instanceof Error?err.message:err
        })
    }
    next()
})

// 导入并使用路由模块
const userRouter=require('./router/user')
app.use('/api',userRouter)
// 注意：以/person开头的接口，都是有权限的接口，需要进行 Token 身份认证
const userinforRouter=require('./router/userinfor')
app.use('/person',userinforRouter)
//以article开头
const articleCateRouter=require('./router/article_cate')
app.use('/article',articleCateRouter)
// 错误中间件
app.use((err,req,res,next)=>{
    if(err instanceof joi.ValidationError){
        return res.mes(err)
    }
    // 捕获身份认证失败的错误,参照文档，要不会报错
    if (err.name === 'UnauthorizedError') res.status(401).send('invalid token...');
    res.mes(err)
    
})

app.listen(3007,function(){
    console.log('api server running at http://127.0.0.1:3007')
})