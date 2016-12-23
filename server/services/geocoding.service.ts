import * as https from 'https';

import { GeocodeResult } from '../../model/geocode-result';

export class GeocodeService {
    findLocation(lat: number, lng: number): Promise<GeocodeResult> {
        const httpOptions = {
            hostname: 'maps.googleapis.com',
            path: '/maps/api/geocode/json?key=AIzaSyD5wkzv67fz40q8WmDI-M5el2dRRlJ90ck&latlng=' + lat + ',' + lng,
            method: 'GET'
        };

        return new Promise<GeocodeResult>((resolve, reject) => {
            let request = https.get(httpOptions, res => {
                if (res.statusCode < 200 || res.statusCode > 299) {
                    reject(res.statusCode);
                    return;
                }

                const body = [];
                res.on('data', chunk => body.push(chunk));
                res.on('end', () => {
                    let response = JSON.parse(body.join(''));

                    let addressComponents = response.results[0].address_components;

                    let locality = addressComponents.filter(ac => ac.types.find(
                        t => t == "street_number" || t == "route" || t == "natural_feature" || t == "establishment"
                    ));
                    let area = addressComponents.filter(ac => ac.types.find(
                        t => t == "locality" || t == "administrative_area_level_1" || t == "postal_code"));

                    let localityString = locality.map(t => t.short_name).join(' ');
                    let areaString = area.map(t => t.short_name).join(', ');

                    resolve(new GeocodeResult(localityString, areaString, lat, lng));
                });
            });

            request.on('error', err => { console.error("BOOO"); reject(err); });
        });
    }
}