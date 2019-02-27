// Album schema model 

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
    name: String,
    release: Date,
    cost: Decimal
});

module.exports = mongoose.model('Album', AlbumSchema);