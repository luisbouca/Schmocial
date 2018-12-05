var Event = require('../models/event')

const Events = module.exports

//Returns Events list
Events.list = ()=>{
    return Event
        .find({})
        .exec()
}

//Returns Events by title
Events.getByTitle = title=>{
    return Event
        .findOne({title: title})
        .exec()
}
//Create new Events
Events.insertNew = newDoc=>{
    return Event
        .create(newDoc)
}