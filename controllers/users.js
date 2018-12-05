var User = require('../models/user')

const Users = module.exports

//Returns obra list

listaCompras.list = ()=>{
    return User
        .find()
        .sort({username:1})
        .exec()
}

//return obra by id
listaCompras.getByState = state=>{
    return User
        .findOne({estado: state})
        .exec()
}
//count obras
listaCompras.insertNew = newEntrada=>{
    return User
        .create(newEntrada)
}