var Message = require('../models/messages')
var moment = require('moment');

const Messages = module.exports

//Get Messages between users
Messages.listBetweenUsers = (user1,user2)=>{  
    return Message
    .find({idUser1:user1, idUser2:user2},{messages:0}) 
    .exec()
        
}
//Add Messages between users
Messages.addMessages = info=>{ 
    console.log("Chego ao controller")
    for(var key in info.mensagens){
        console.log("Mensagem "+key)
     }
    return Message
        .update({idUser1:info.idUser1, idUser2:info.idUser2}, {$push:{mensagens:info.mensagens}})
        .exec()
        
}

//Create new Message
Messages.insertNew = newDoc=>{
    return Message
        .create(newDoc)
}