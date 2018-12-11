var mongose = require('mongoose')
var bcrypt = require('bcryptjs')
var md5 = require('md5')

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
    gender: {type: String},
    address: addressSchema
})

UserSchema.pre('save', async function (next) {
    var hash = await bcrypt.hash(md5(this.password), 10)
    this.password = hash
    next()
})

module.exports = mongose.model('Users', UserSchema,'users')