var mongoose = require('mongoose'),

    Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String, required: true},
    user: { type: Schema.Types.ObjectId },
    date: {type: Date, required: true}
});

module.exports = mongoose.model('Event', schema);
