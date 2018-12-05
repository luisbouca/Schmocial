var Post = require('../models/post')

const Posts = module.exports

//Returns Posts list
Posts.list = ()=>{
    return Post
        .find({})
        .exec()
}

//Returns Comment list for post by id
Posts.listComments = id=>{
    return Post
        .findOne({_id:id},{comments:1, _id:0})
        .exec()
}

//Returns Posts by title
Posts.getByTitle = title=>{
    return Post
        .findOne({title: title})
        .exec()
}
//Create new Posts
Posts.insertNew = newDoc=>{
    return Post
        .create(newDoc)
}