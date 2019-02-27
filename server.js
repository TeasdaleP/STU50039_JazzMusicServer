
// =============================================================================
// BASE SETUP
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://ApplicationConnection:0OEEFqnFlC4z3mh2@jazzmusic-shard-00-00-1gmv1.mongodb.net:27017,jazzmusic-shard-00-01-1gmv1.mongodb.net:27017,jazzmusic-shard-00-02-1gmv1.mongodb.net:27017/test?ssl=true&replicaSet=JazzMusic-shard-0&authSource=admin&retryWrites=true')

var Address = require('./modules/address');

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
// ADDRESS ROUTES
router.route('/address')

    // create address
    .post(function (req, res) {

        var address = new Address();
        address.line1 = req.body.line1;
        address.line2 = req.body.line2;
        address.postcode = req.body.postcode;

        address.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'Address added!' });
        });
    })

    // get addresses
    .get(function (req, res) {
        Address.find(function (err, address) {
            if (err)
                res.send(err);

            res.json(address);
        });
    });

// =============================================================================
// ADDRESS SPECIFIC
router.route('/address/:address_id')

    // specific address
    .get(function (req, res) {
        Address.findById(req.params.address_id, function (err, address) {
            if (err)
                res.send(err);
            res.json(address);
        });
    })

    // update address
    .put(function (req, res) {
        Address.findById(req.params.address_id, function (err, address) {
            if (err)
                res.send(err);

            address.line1 = req.body.line1;
            address.line2 = req.body.line2;
            address.postcode = req.body.postcode;

            address.save(function (err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Address has been updated!' });
            });

        });
    })

// =============================================================================
// START THE SERVER

app.use('/api', router);

app.listen(port);
console.log('Requests available on port ' + port);
