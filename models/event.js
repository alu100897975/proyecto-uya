var mongoose = require('mongoose'),

    Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String, required: true},
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    date: {
        day: {type: Number, required: true},
        month: {type: Number, required: true},
        year: {type: Number, required: true},
    },
    time: {
        hour: {type: Number},
        minutes: {type: Number},
    },
    observations: {type: String}
});

module.exports = mongoose.model('Event', schema);
