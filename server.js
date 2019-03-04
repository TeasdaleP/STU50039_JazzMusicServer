const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const database = mysql.createConnection({
    host: 'localhost',
    user: 'websiteuser',
    password: 'W3bs1t3_Pa$$w0rd',
    database: 'JazzMusic'
})

database.connect();

//var Artist = require('model/artist.js');

app.get('/', function (req, res) {
    return res.send({ error: true, message: 'Success. Its worked as expected.' })
})

app.get('/artists', function (req, res) {
    database.query('SELECT * FROM Artists', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'All Artists' })
    })
})

app.post('/artists', function (req, res) {
    let artist = [
        req.body.nameofelement,
        req.body.otherelement
    ];

    if (!artist) {
        return res.status(400).send({ error: true, message: 'Please provide an artist.' })
    }

    database.query('INSERT INTO Artists SET ? ', { artist: artist }, function (error, results, fields) {
        if (error) throw error;
        return res.send({error: false, data: results, message: 'Artist Added Successfully'})
    })
})

app.get('/artists/:id', function (req, res) {
    let artist_id = req.params.id;
    database.query('SELECT * FROM Artists where id=?', artist_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Artist' });
    });
});

app.listen(8080, function () {
    console.log('Application is running on port 8080.')
})