// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入文章分类的路由处理函数模块
const article_cate_handler=require('../router_handler/article_cate')
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入文章分类的验证模块
const {addCate_verify}=require('../message_verify/article_cate')
// 导入删除分类的验证规则对象
const {deleteCateById_verify}=require('../message_verify/article_cate')
// 导入根据 Id 获取分类的验证规则对象
const {getCateById_verify}=require('../message_verify/article_cate')
//导入更新文章分类的验证规则对象
const {updateCateById_verify}=require('../message_verify/article_cate')
// 获取文章分类的列表数据
router.get('/cates',article_cate_handler.getArticleCate )
router.post('/addcates',expressJoi(addCate_verify),article_cate_handler.addArticleCate)
router.get('/deletecate/:id',expressJoi(deleteCateById_verify),article_cate_handler.deleteCateById)
router.get('/cates/:id',expressJoi(getCateById_verify),article_cate_handler.getArticleCateById)
router.post('/updatecate',expressJoi(updateCateById_verify),article_cate_handler.updateArticleCateById)
// 向外共享路由对象
module.exports = router