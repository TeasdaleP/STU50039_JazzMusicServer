// Artist schema model 

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtistSchema   = new Schema({
    reference: string,
    name: string,
    genre: string,
    album: []
});

module.exports = mongoose.model('Artist', ArtistSchema);