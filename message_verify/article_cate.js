const joi=require('joi')
//定义 分类名称 和 分类别名 的校验规则
const name=joi.string().required()
const alias = joi.string().alphanum().required()
// 定义 分类Id 的校验规则
const id = joi.number().integer().min(1).required()
exports.addCate_verify={
    body:{
        name,
        alias
    }
}
exports.deleteCateById_verify={
    params:{
        id
    }
}
exports.getCateById_verify={
    params:{
        id
    }
}
exports.updateCateById_verify={
    body:{
        id,
        name,
        alias
    }
}