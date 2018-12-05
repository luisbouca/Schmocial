var mongose = require('mongoose')

var schema = mongose.Schema

var postSchema = new schema({
    title: {type: String, required:true},
    date: {type: String, required:true},
    content: {type: String},
    picture:{type: String},
    file:{type:String},
    comments: commentSchema,
    votes: voteSchema
    
})

var commentSchema = new schema({
    message: {type: String, required:true},
    user: {type: String, required:true},
    date: {type: String}
})

var voteSchema = new schema({
    type: {type: String, required:true},
    user: {type: String, required:true}
})

module.exports = mongose.model('Posts', postSchema,'posts')