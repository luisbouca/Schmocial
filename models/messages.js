var mongose = require('mongoose')

var schema = mongose.Schema

var mensagem = new schema({
    nome:{type:String},
    foto:{type:String},
    texto : {type:String}
})
var MessageSchema = new schema({
    idUser1 : {type:String},
    idUser2 : {type:String},
    mensagens: [mensagem]
})

module.exports = mongose.model('Message', MessageSchema,'message')