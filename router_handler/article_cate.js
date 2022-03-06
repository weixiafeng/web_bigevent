// 导入数据库操作模块
const db = require('../db/index')

exports.getArticleCate=(req,res)=>{
    const sql = 'select * from bigevent_article_cate where is_delete=0 order by id asc'
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.mes(err)
      
        // 2. 执行 SQL 语句成功
        res.send({
          status: 0,
          message: '获取文章分类列表成功！',
          data: results,
        })
    })
}
exports.addArticleCate=(req,res)=>{
  // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
  const sql = `select * from bigevent_article_cate where name=? or alias=?`
  // 执行查重操作
  db.query(sql, [req.body.name, req.body.alias], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.mes(err)
    // 判断 分类名称 和 分类别名 是否被占用
    if (results.length === 2) return res.mes('分类名称与别名被占用，请更换后重试！')
    // 分别判断 分类名称 和 分类别名 是否被占用
    if (results.length === 1 && results[0].name === req.body.name) return res.mes('分类名称被占用，请更换后重试！')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.mes('分类别名被占用，请更换后重试！')

    // 新增文章分类
    const sql = `insert into bigevent_article_cate set ?`
    db.query(sql, req.body, (err, results) => {
      // SQL 语句执行失败
      if (err) return res.mes(err)
    
      // SQL 语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.mes('新增文章分类失败！')
    
      // 新增文章分类成功
      res.mes('新增文章分类成功！', 0)
    })

  })
}
exports.deleteCateById=(req,res)=>{
  const sql = `update bigevent_article_cate set is_delete=1 where id=?`
  db.query(sql, req.params.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.mes(err)
  
    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.mes('删除文章分类失败！')
  
    // 删除文章分类成功
    res.mes('删除文章分类成功！', 0)
  })
}
exports.getArticleCateById=(req,res)=>{
  const sql=`select * from bigevent_article_cate where id=?`
  db.query(sql, req.params.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.mes(err)
  
    // SQL 语句执行成功，但是没有查询到任何数据
    if (results.length !== 1) return res.mes('获取文章分类数据失败！')
  
    // 把数据响应给客户端
    res.send({
      status: 0,
      message: '获取文章分类数据成功！',
      data: results[0],
    })
  })
}
exports.updateArticleCateById=(req,res)=>{
  // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
  const sql = `select * from bigevent_article_cate where Id<>? and (name=? or alias=?)`
  // 执行查重操作
  db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.mes(err)
    // 判断 分类名称 和 分类别名 是否被占用
    if (results.length === 2) return res.mes('分类名称与别名被占用，请更换后重试！')
    if (results.length === 1 && results[0].name === req.body.name) return res.mes('分类名称被占用，请更换后重试！')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.mes('分类别名被占用，请更换后重试！')

    // 更新文章分类
    const sql = `update bigevent_article_cate set ? where id=?`
    db.query(sql, [req.body, req.body.id], (err, results) => {
      // 执行 SQL 语句失败
      if (err) return res.mes(err)
      // SQL 语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.mes('更新文章分类失败！')
      // 更新文章分类成功
      res.mes('更新文章分类成功！', 0)
    })
  })
}