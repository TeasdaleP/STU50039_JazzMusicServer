// Customer schema model 

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeliverySchema = new Schema({
    dispatch: String,
    orders: [],
    courier: String,
    trackingref: String,
    expectdelivery: Date,
    address: [],
});

module.exports = mongoose.model('Delivery', DeliverySchema);