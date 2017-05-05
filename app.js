var bodyParser = require('body-parser');
var http = require('http');
var express = require('express');
var app = express();
var mysql = require("mysql");


//mysql
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'userpasswd',
    database: 'plantsDB'
});

connection.connect();

// set up BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/html');
app.engine('html', require('ejs').renderFile);
app.get('/', function(req, response) {
    response.render("index.html", "");
});

app.get('/assortiment', function(req, response) {
    response.render('assortiment.html', {});
});

app.get('/', function(req, response) {
    response.render('index.html', {});
});

app.get('/route', function(req, response) {
    response.render('route.html', {});
});

app.post('/load_locations', function(req, res) {
    console.log(req.body);
    var locations = getLocations(req.body.start, req.body.end);

    locations.then(function(results) {
        res.json({
            locations: results
        });
    });
})




//sql functions

// checkLogin = (username, password) => {

//     var statement = 'Select * from accounts where username=?';
//     connection.query(statement, [username], function(error, results, fields) {
//         if (error) throw error;
//         console.log(results[0].password == password);
//     });

//     connection.end();
// };

// getLocations = (start, end) => {
//     return new Promise(function(resolve) {
//         var statement = 'Select * from locations limit ?,?';
//         connection.query(statement, [start, end], function(error, results, fields) {
//             if (error) throw error;
//             resolve(results);
//         });
//     });


//     connection.end();
// };



var server = http.createServer(app);
server.listen(8080, function() {
    console.log("listening on 8080");
});