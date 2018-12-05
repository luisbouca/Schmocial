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
        .findOne({name: name})
        .exec()
}
//Create new User
Users.insertNew = newDoc=>{
    return User
        .create(newDoc)
}