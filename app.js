"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');
var geocoding_service_1 = require('./server/services/geocoding.service');
var port = process.env.PORT || 8080;
var env = process.env.NODE_ENV || 'development';
var projectRoot = __dirname;
var geocodeService = new geocoding_service_1.GeocodeService();
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(projectRoot));
//app.use('/node_modules', express.static(projectRoot + '/node_modules'));
if (env === 'development') {
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        next();
    });
}
else {
    app.use('/node_modules/angularfire2/node_modules', express.static(projectRoot + '/node_modules'));
}
app.post('/fwd', function (req, res) {
    var body = req.body;
    var data = {
        location: '',
        area: '',
        lat: parseFloat(body.l),
        lng: parseFloat(body.n)
    };
    geocodeService.findLocation(data.lat, data.lng)
        .then(function (g) {
        data.location = g.location;
        data.area = g.area;
        var postData = JSON.stringify(data);
        var id = body.t;
        var httpOptions = {
            hostname: 'solotracker-61ff4.firebaseio.com',
            path: '/checkins/' + id + '.json?auth=iFYaeT8KoYLiLdOVqRyZyoaWxs6dcMcTS3sGIdIk',
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(postData)
            }
        };
        var request = https.request(httpOptions, function (res) {
            if (res.statusCode !== 200) {
                var str_1 = '';
                res.on('data', function (chunk) {
                    str_1 += chunk;
                });
                console.error(res.statusCode + " " + str_1);
                return;
            }
        });
        request.on('error', function (err) {
            console.error("Request error: " + err);
        });
        request.end(postData);
        res.removeHeader('X-Powered-By');
        res.removeHeader('ETag');
        res.status(201).send('');
    })
        .catch(function (err) { return console.error(err); });
});
app.get('/', function (req, res) { return res.sendFile(projectRoot + '/index.html'); });
app.listen(port);
//# sourceMappingURL=app.js.map