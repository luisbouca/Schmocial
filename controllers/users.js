var User = require('../models/user')

const Users = module.exports

//Returns Users list
Users.list = ()=>{
    return User
        .find({})
        .exec()
}

//Returns User by name
Users.getByName = name=>{
    return User
        .find({name: name})
        .exec()
}

//Returns User by id
Users.getById = id=>{
    return User
        .findOne({_id: id})
        .exec()
}

//Insert New Friend 
Users.insertNewFriend = newFriend=>{
    return User
        .updateOne({_id:newFriend.userDest}, {$push:{friends:newFriend.userOrigin}})
        .exec()
}

//Insert New Friend 
Users.getFriends = id=>{
    return User
        .find({_id: id}, {_id:0,friends:1})
        .exec()
}

//Create new User
Users.insertNew = newDoc=>{
    return User
        .create(newDoc)
}