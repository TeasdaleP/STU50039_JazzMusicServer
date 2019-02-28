// - music format enum
var MusicFormat = {
    CD = "cd",
    Vinyl = "vinyl"
}

// - artist schema 
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var ArtistSchema = new Schema({
    name: String,
    description: String,
    genre: String,
    album: [{
        title: String,
        description: String,
        release: Date,
        format: MusicFormat, 
        cost: Number,
        stock: Number
    }],
    reference: String
}) 
 
module.exports = mongoose.model('Artist', ArtistSchema);

