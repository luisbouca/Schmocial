var mongose = require('mongoose')

var schema = mongose.Schema


var commentSchema = new schema({
    message: {type: String, required:true},
    user: {type: String, required:true},
    date: {type: String}
})

var voteSchema = new schema({
    type: {type: String, required:true},
    user: {type: String, required:true}
})


var postSchema = new schema({
    title: {type: String, required:true},
    date: {type: String, required:true},
    content: {type: String},
    picture:{type: String},
    file:{type:String},
    comments: commentSchema,
    votes: voteSchema
    
})

module.exports = mongose.model('Posts', postSchema,'posts')