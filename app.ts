import express = require('express');
import bodyParser = require('body-parser');
import * as https from 'https';

import { GeocodeService } from './server/services/geocoding.service';

let port = process.env.PORT || 8080;
let env = process.env.NODE_ENV || 'development';
let projectRoot = __dirname;

let geocodeService = new GeocodeService();

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(projectRoot));
//app.use('/node_modules', express.static(projectRoot + '/node_modules'));

if (env === 'development') {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        next();
    })
} else {
    app.use('/node_modules/angularfire2/node_modules', express.static(projectRoot + '/node_modules'));
}

app.post('/fwd', (req, res) => {
    let body = req.body;
    let data = {
        location: '',// TODO,
        area: '',
        lat: parseFloat(body.l),
        lng: parseFloat(body.n)
    };

    geocodeService.findLocation(data.lat, data.lng)
        .then(g => {
            data.location = g.location;
            data.area = g.area;
            let postData = JSON.stringify(data);
            let id = body.t;

            const httpOptions = {
                hostname: 'solotracker-61ff4.firebaseio.com',
                path: '/checkins/' + id + '.json?auth=iFYaeT8KoYLiLdOVqRyZyoaWxs6dcMcTS3sGIdIk',
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.byteLength(postData)
                }
            };
            
            let request = https.request(httpOptions, res => {
                if (res.statusCode !== 200) {
                    let str = ''
                    res.on('data', function (chunk) {
                        str += chunk;
                    });

                    console.error(res.statusCode + " " + str);
                    return;
                }
            });

            request.on('error', err => {
                console.error("Request error: " + err);
            })

            request.end(postData);

            res.removeHeader('X-Powered-By');
            res.removeHeader('ETag');
            res.status(201).send('');
        })
        .catch(err => console.error(err));
});

app.get('/', (req, res) => res.sendFile(projectRoot + '/index.html'));

app.listen(port);