var Post = require('../models/post')

const Posts = module.exports

//Returns Posts list
Posts.list = ()=>{
    return Post
        .find({})
        .sort({_id:-1}) 
        .exec()
}

//Returns Posts by hashtags
Posts.listByHashtags = hashtags =>{
    console.log("CHEGUEI" + hashtags.length)
    
    return Post
        .find({hashtags:{$in:hashtags}})
        .sort({_id:-1}) 
        .exec()

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
        .sort({_id:-1}) 
        .exec()
}

//Insert comment in Post
Posts.insertNewComent = (id,newDoc)=>{
    console.log("\""+newDoc.user+"\"") 
    return Post
        .update({_id:id}, {$push:{comments:newDoc}})
        .exec()
        
}

//Remove comment in Post
Posts.removeComment = (info)=>{  
    console.log("Nao aqui")
    return Post
        .update({_id: info.post},
            {$pull:{ comments: {_id:info.comment} }})
        .exec()
        
}

//Insert vote in Post
Posts.insertNewVote = (user,post)=>{ 
    return Post
        .update({_id:post}, {$push:{votes:user}})
        .exec()
        
}

//Remove vote in Post
Posts.removeVote = (user,post)=>{ 
    return Post
        .update({_id: post},
            { $pull: { "votes" : user } })
        .exec()
        
}

//List all Post Hashtags 
Posts.listHashtags = ()=>{
    return Post
        .aggregate([{$unwind:"$hashtags"}, 
        {$group:{_id:"$hashtags", count:{$sum:1}}},
        {$sort:{count:-1}},
        {$limit:5},
        {$project: {_id:0, hashtags :"$_id", count:"$count"}}
    ])
        .exec()
}

//Update status Post
Posts.updatePost = info=>{
    return Post
        .update({_id:info.id},
            {$set:{state:info.estado}})
            .exec()
}

//Remove Post
Posts.removePost = id=>{
    return Post
        .remove({_id:id})
        .exec()
}

//Create new Posts
Posts.insertNew = newDoc=>{ 
    return Post
        .create(newDoc)
}

//Exports Posts list
Posts.export = ()=>{
    return Post
        .find({}) 
        .exec()
}