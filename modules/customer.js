// Customer schema model 

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    firstname: String,
    surname: String,
    dob: Date,
    email: String,
    telephoneNo: String,
    address: [],
    orders: []
});

module.exports = mongoose.model('Customer', CustomerSchema);