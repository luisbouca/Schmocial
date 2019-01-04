var mongose = require('mongoose')
var bcrypt = require('bcryptjs')
var md5 = require('md5')

var schema = mongose.Schema

var addressSchema = new schema({
    street: {type: String},
    country: {type: String},
    city: {type: String}
})

var friendSchema = new schema({
    id: {type: String},
    name:{type:String},
    state: {type: String}
})

var UserSchema = new schema({
    name: {type: String, required:true},
    username: {type: String, required:true},
    password: {type: String, required:true},
    email: {type: String, required:true},
    age: {type: String},
    gender: {type: String},
    friends:[friendSchema],
    address: addressSchema,
    facebook: {
        id: {type: String},
        token: {type: String},
        email: {type: String},
        name: {type: String}
      },
})

UserSchema.pre('save', async function(next){
    var hash = await bcrypt.hash(md5(this.password), 10)
    this.password = hash
    next()
})

UserSchema.methods.isValidPassword = async function(password){
    var user = this
    var compare = await bcrypt.compare(md5(password), user.password)
    return compare
}

module.exports = mongose.model('Users', UserSchema,'users')
