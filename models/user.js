var mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),

    Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String, required: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true}/*,
    events: [{type: Schema.Types.ObjectId, ref: 'Event'}]*/
});
schema.plugin(uniqueValidator);
module.exports = mongoose.model('User', schema);
