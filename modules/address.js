// Address schema model 

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddressSchema = new Schema({
    line1: String,
    line2: String,
    postcode: String
});

module.exports = mongoose.model('Address', AddressSchema);