// Create web server
// 1. Create web server
// 2. Load the comments.html
// 3. When the user posts a new comment, save it to the file
// 4. When the user loads the comments page, read the file and show all the comments

// 1. Create web server
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// 2. Load the comments.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/comments.html');
});

// 3. When the user posts a new comment, save it to the file
app.post('/new_comment', function(req, res) {
    let comment = req.body.comment;
    fs.appendFile('comments.txt', comment + '\n', function(err) {
        if (err) throw err;
        res.redirect('/');
    });
});

// 4. When the user loads the comments page, read the file and show all the comments
app.get('/comments', function(req, res) {
    fs.readFile('comments.txt', 'utf8', function(err, data) {
        if (err) throw err;
        let comments = data.split('\n');
        res.send(comments);
    });
});

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});