var mongose = require('mongoose')

var schema = mongose.Schema

var addressSchema = new schema({
    street: {type: String},
    country: {type: String},
    city: {type: String}
})

var UserSchema = new schema({
    name: {type: String, required:true},
    username: {type: String, required:true},
    password: {type: String, required:true},
    email: {type: String, required:true},
    age: {type: String},
    address: addressSchema
})


module.exports = mongose.model('Users', UserSchema,'users')