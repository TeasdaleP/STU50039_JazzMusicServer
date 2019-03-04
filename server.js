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
    user: 'root',
    password: 'W3bs1t3_Pa$$w0rd',
    database: 'jazzmusic'
})

database.connect();

app.get('/', function (req, res) {
    return res.send({ error: true, message: 'Success. Its worked as expected.' })
})

//-- Artist Routes
app.get('/artist', function (req, res) {
    database.query('SELECT * FROM artist', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'All Artists' })
    })
})

app.post('/artist', function (req, res) {
    let artist = [
        req.body.ArtistName,
        req.body.Genre,
        req.body.AristsAlbum
    ];

    if (!artist) {
        return res.status(400).send({ error: true, message: 'Please provide an artist.' })
    }

    database.query('INSERT INTO artist (ArtistsName, Genre, ArtistsAlbum) VALUES', artist, function (error, results, fields) {
        if (error) throw error;
        return res.send({error: false, data: results, message: 'Artist Added Successfully'})
    })
})

app.get('/artist/:id', function (req, res) {
    let artist_id = req.params.id;
    database.query('SELECT * FROM artist where id=?', artist_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Artist' });
    });
});

//-- Album Routes
app.get('/album', function (req, res) {
    database.query('SELECT * FROM album', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'All Albums' })
    })
})

app.post('/album', function (req, res) {
    let album = [
        req.body.AlbumName,
        req.body.ReleaseDate,
        req.body.AristsAlbum
    ];

    if (!artist) {
        return res.status(400).send({ error: true, message: 'Please provide an album.' })
    }

    database.query('INSERT INTO album (ArtistsName, Genre, ArtistsAlbum) VALUES (' + album + ')', function (error, results, fields) {
        if (error) throw error;
        return res.send({error: false, data: results, message: 'Album Added Successfully'})
    })
})

app.get('/album/:id', function (req, res) {
    let artist_id = req.params.id;
    database.query('SELECT * FROM album where id=?', artist_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Album' });
    });
});

app.listen(8080, function () {
    console.log('Application is running on port 8080.')
})