var mongose = require('mongoose')

var schema = mongose.Schema

var participantSchema = new schema({
    id : {type:String},
    name : {type: String}
})
var EventSchema = new schema({
    datetime : {type: String,required:true},
    local : {type: String,required:true},
    title : {type: String,required:true},
    description : {type: String},
    participants : [participantSchema]
})

module.exports = mongose.model('Events', EventSchema,'events')