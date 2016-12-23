"use strict";
var https = require('https');
var geocode_result_1 = require('../../model/geocode-result');
var GeocodeService = (function () {
    function GeocodeService() {
    }
    GeocodeService.prototype.findLocation = function (lat, lng) {
        var httpOptions = {
            hostname: 'maps.googleapis.com',
            path: '/maps/api/geocode/json?key=AIzaSyD5wkzv67fz40q8WmDI-M5el2dRRlJ90ck&latlng=' + lat + ',' + lng,
            method: 'GET'
        };
        return new Promise(function (resolve, reject) {
            var request = https.get(httpOptions, function (res) {
                if (res.statusCode < 200 || res.statusCode > 299) {
                    reject(res.statusCode);
                    return;
                }
                var body = [];
                res.on('data', function (chunk) { return body.push(chunk); });
                res.on('end', function () {
                    var response = JSON.parse(body.join(''));
                    var addressComponents = response.results[0].address_components;
                    var locality = addressComponents.filter(function (ac) { return ac.types.find(function (t) { return t == "street_number" || t == "route" || t == "natural_feature" || t == "establishment"; }); });
                    var area = addressComponents.filter(function (ac) { return ac.types.find(function (t) { return t == "locality" || t == "administrative_area_level_1" || t == "postal_code"; }); });
                    var localityString = locality.map(function (t) { return t.short_name; }).join(' ');
                    var areaString = area.map(function (t) { return t.short_name; }).join(', ');
                    resolve(new geocode_result_1.GeocodeResult(localityString, areaString, lat, lng));
                });
            });
            request.on('error', function (err) { console.error("BOOO"); reject(err); });
        });
    };
    return GeocodeService;
}());
exports.GeocodeService = GeocodeService;
//# sourceMappingURL=geocoding.service.js.map