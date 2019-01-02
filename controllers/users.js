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

//Get Friend 
Users.getFriends = id=>{
    return User
        .find({_id: id, "friends.state":"request"}, {_id:0,friends:1})
        .exec()
}

//Accept Friend 
Users.acceptFriend = info=>{
        User
        .updateOne({_id:info.user}, {$push:{friends:info.friend}})
        .exec()

        return User
        .updateOne({_id:info.friend.id, "friends.id":info.user}, {$set:{"friends.$.state":"accepted"}})
        .exec()
}

//Decline Friend 
Users.deleteFriend = info=>{
    console.log("OLAAAAAAA "+info.user)
    return User
        .update({_id: info.user},
            { $pull: { "friends" : { id: info.friend } } })
        .exec()
}

//Create new User
Users.insertNew = newDoc=>{
    return User
        .create(newDoc)
}