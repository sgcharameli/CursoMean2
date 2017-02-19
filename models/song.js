'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var songSchema = schema({
    name: String,
    number: String,
    duration: String,
    file: String,
    album: {type: schema.ObjectId, ref: 'album'}
});

module.exports = mongoose.model('song', songSchema);