// Adress schema model 

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddressSchema   = new Schema({
    reference: string,
    line1: string,
    line2: string,
    postcode: string
});

module.exports = mongoose.model('Address', AddressSchema);