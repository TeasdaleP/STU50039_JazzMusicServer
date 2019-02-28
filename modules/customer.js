// - music format enum
var MusicFormat = {
    CD = "cd",
    Vinyl = "vinyl"
}

// - customer schema 
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var CustomerSchema = new Schema({
    title: String,
    firstname: String,
    surname: String,
    dob: Date,
    email: String,
    telephone: String,
    address: [{
        line1: String,
        line2: String,
        city: String,
        postcode: String
    }],
    order:[{
        qty: Number,
        albumn: String,
        format: MusicFormat,
        cost: Number,
        delivery: [{
            expectedDeliver: Date,
            courier: String,
            tracking: String
        }]
    }],
    reference: String
}) 
 
module.exports = mongoose.model('Customer', CustomerSchema);

