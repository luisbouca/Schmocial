var Event = require('../models/event')

const Events = module.exports

//Returns Events list
Events.list = ()=>{
    return Event
        .find({})
        .sort({date:1}) 
        .exec()
}

//Returns Events by title
Events.getByTitle = title=>{
    return Event
        .findOne({title: title})
        .exec()
}

//Insert Participants
Events.insertNewParticipant = newParticipant=>{ 
    return Event
        .update({_id:newParticipant.idPost}, {$push:{participants:newParticipant.participant}})
        .exec()
        
}

//Get Participants
Events.getParticipants = id=>{ 
    return Event
    .find({_id:id},{_id:0,participants:1}) 
    .exec()
        
}

//Create new Events
Events.insertNew = newDoc=>{
    return Event
        .create(newDoc)
}