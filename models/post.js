var mongose = require('mongoose')

var schema = mongose.Schema


var commentSchema = new schema({
    message: {type: String, required:true},
    user: {type: String, required:true},
    date: {type: String},
    picture: {type:String}
})

var voteSchema = new schema({
    type: {type: String, required:true},
    user: {type: String, required:true}
})


var postSchema = new schema({
    owner: {type: String, required:true},
    title: {type: String, required:true},
    date: {type: String, required:true},
    content: {type: String},
    picture:{type: String},
    file:{type:String},
    state:{type:String},
    hashtags:[{type:String}],
    comments: [commentSchema],
    votes: [{type:String}]
    
})

module.exports = mongose.model('Posts', postSchema,'posts')