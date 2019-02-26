
// BASE SETUP
// =============================================================================
var express    = require('express'); 
var app        = express();      
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('mongodb+srv://ApplicationConnection:0OEEFqnFlC4z3mh2@jazzmusic-1gmv1.mongodb.net/test?retryWrites=true'); 

var Address = require('./modules/address');

// configure app to use bodyParser(), this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Success. Its worked as expected' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
