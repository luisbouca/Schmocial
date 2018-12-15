var Post = require('../models/post')

const Posts = module.exports

//Returns Posts list
Posts.list = ()=>{
    return Post
        .find({})
        .sort({_id:-1}) 
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

//Returns Posts by user
Posts.getByUser = user=>{
    return Post
        .find({owner: user})
        .exec()
}

//Insert comment in Post
Posts.insertNewComent = (id,newDoc)=>{
    console.log("\""+newDoc.user+"\"") 
    return Post
        .update({_id:id}, {$push:{comments:newDoc}})
        .exec()
        
}


//Create new Posts
Posts.insertNew = newDoc=>{ 
    return Post
        .create(newDoc)
}