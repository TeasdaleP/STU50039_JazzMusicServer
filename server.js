// =============================================================================
// BASE SETUP
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://ApplicationConnection:0OEEFqnFlC4z3mh2@jazzmusic-shard-00-00-1gmv1.mongodb.net:27017,jazzmusic-shard-00-01-1gmv1.mongodb.net:27017,jazzmusic-shard-00-02-1gmv1.mongodb.net:27017/test?ssl=true&replicaSet=JazzMusic-shard-0&authSource=admin&retryWrites=true')

var Artist = require('./modules/artist');
var Customer = require('./modules/customer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// =============================================================================
// ROUTES FOR OUR API
var router = express.Router();

router.use(function (req, res, next) {
    console.log('Request has been made successfully');
    next();
});

router.get('/', function (req, res) {
    res.json({ message: 'Success. Its worked as expected' });
});

// =============================================================================
// ARTIST GENERAL
router.route('/artist')

    // create artist and album
    .post(function (req, res) {

        var artist = new Artist();

        artist.name = req.body.name;
        artist.description = req.body.description;
        artist.genre = req.body.genre;
        artist.album = [
            artist.album.title = req.body.album.title,
            artist.album.description = req.body.album.description,
            artist.album.release = req.body.album.release,
            artist.album.format = req.body.album.format,
            artist.album.cost = req.body.album.cost,
            artist.album.stock  = req.body.album.stock
        ]
        artist.reference = req.body.reference;

        artist.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'Artist added!' });
        });
    })

    // get all artists
    .get(function (req, res) {
        Artist.find(function (err, artist) {
            if (err)
                res.send(err);

            res.json(artist);
        });
    });

// =============================================================================
// ARTIST SPECIFIC
router.route('/artist/:artist_id')

    // specific artist
    .get(function (req, res) {
        Artist.findById(req.params.artist_id, function (err, artist) {
            if (err)
                res.send(err);
            res.json(artist);
        });
    })

// =============================================================================
// CUSTOMER GENERAL
router.route('/customer')

    // create customer 
    .post(function (req, res) {

        var customer = new Customer();

        customer.title = req.body.title;
        customer.firstname = req.body.firstname;
        customer.surname = req.body.surname;
        customer.dob = req.body.dob;
        customer.email = req.body.email;
        customer.telephone = req.body.telephone;
        customer.address = [
            customer.address.line1 = req.body.address.line1,
            customer.address.line2 = req.body.address.line2,
            customer.address.postcode = req.body.address.postcode
        ]
        customer.order = [
            customer.order.qty = req.body.order.qty,
            customer.order.album = req.body.order.album,
            customer.order.format = req.body.order.format,
            customer.order.delivery = [
                customer.order.delivery.expectedDelivery = req.body.order.delivery.expectedDelivery,
                customer.order.delivery.courier = req.body.order.delivery.courier,
                customer.order.delivery.tracking = req.body.order.delivery.tracking,
            ],
        ]
        customer.reference = req.body.reference;

        customer.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'Customer added!' });
        });
    })

    // get all customers
    .get(function (req, res) {
        Customer.find(function (err, customer) {
            if (err)
                res.send(err);

            res.json(customer);
        });
    });

// =============================================================================
// CUSTOMER SPECIFIC
router.route('/customer/:customer_id')

    // specific artist
    .get(function (req, res) {
        Customer.findById(req.params.customer_id, function (err, customer) {
            if (err)
                res.send(err);
            res.json(customer);
        });
    })

// =============================================================================
// START THE SERVER
app.use('/api', router);

app.listen(port);
console.log('Requests available on port ' + port);
