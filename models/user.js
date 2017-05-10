var mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    bcrypt = require('bcryptjs'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    name: { type: String, required: true},
    email: {type: String, require: true, unique: true},
    password: {type: String},
    googleId: {type: String},
    facebookId: {type: String} /*,
    events: [{type: Schema.Types.ObjectId, ref: 'Event'}]*/
});
userSchema.plugin(uniqueValidator);

userSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}
module.exports = mongoose.model('User', userSchema);
module.exports.hashPassword = function (password){
    return bcrypt.hashSync(password, 10);
}
