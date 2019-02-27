// Orders schema model 

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    reference: String,
    qty: Number,
    Albumn: [],
    format: String,
    cost: Decimal,
    customer: [],
    delivery: []
});

module.exports = mongoose.model('Order', OrderSchema);