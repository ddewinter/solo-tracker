import * as ngc from '@angular/core';
import * as moment from 'moment';

import { PersonTrackerService } from '../services/person-tracker.service';
import { CheckinLocation } from '../../model/checkin-location';

@ngc.Component({
    selector: 'solo-tracker',
    templateUrl: 'app/components/app.component.html',
})
export class AppComponent implements ngc.AfterViewInit {
    @ngc.ViewChild('mapContainer') private mapContainerElementRef: ngc.ElementRef
    @ngc.ViewChild('map') private mapElementRef: ngc.ElementRef

    private map: google.maps.Map;
    private pathLines = new Array<google.maps.Polyline>();
    private checkinLocations= new Array<google.maps.Marker>();
    private infoWindows = new Array<google.maps.InfoWindow>();

    constructor(private personTrackerService: PersonTrackerService) {
        window['initMap'] = () => {
            this.map = new google.maps.Map(this.mapElementRef.nativeElement, {
                // Tiger Mountain
                center: { lat: 47.4883, lng: -121.9467 },
                zoom: 11
            });

            this.personTrackerService.subscribe(locations => this.onNewLocations(locations));
        };
    }

    ngAfterViewInit(): void {
        this.fillMapToClientBounds();

        let node = document.createElement('script');
        node.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDuUvDZsuhwVYScoNpK6Id4SEC3jQ73YSI&callback=initMap';
        node.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(node);
    }

    private fillMapToClientBounds(): void {
        let mapElement = this.mapContainerElementRef.nativeElement;
        let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        let height = Math.min(document.documentElement.clientHeight, window.innerHeight || 0);

        mapElement.style.width = width;
        mapElement.style.height = height;
    }

    private onNewLocations(locations: CheckinLocation[]) {
        let currentLocationCount = this.checkinLocations.length;
        let newLocationCount = locations.length;

        for (let i = currentLocationCount; i < newLocationCount; ++i) {
            let location = locations[i];

            this.addNewMarker(location);

            if (i > 0) {
                this.addNewPathLine(location, locations[i - 1]);
            }
        }

        this.map.setCenter(this.checkinLocations[this.checkinLocations.length - 1].getPosition());
    }

    private addNewPathLine(location: CheckinLocation, lastLocation: CheckinLocation) {
        var coordinates = [
            {
                lat: lastLocation.lat,
                lng: lastLocation.lng
            },
            {
                lat: location.lat,
                lng: location.lng
            }
        ];

        let polyline = new google.maps.Polyline({
            path: coordinates,
            geodesic: true,
            strokeColor: '#FF8000',
            strokeOpacity: 1,
            strokeWeight: 4,
            map: this.map
        });

        this.pathLines.push(polyline);
    }

    private addNewMarker(checkin: CheckinLocation) {
        let marker = new google.maps.Marker({
            position: {
                lat: checkin.lat,
                lng: checkin.lng
            },
            map: this.map
        });

        let date = moment.unix(checkin.$key);
        let dateString = date.format('MMM D H:mm:ss A')

        let infoWindow = new google.maps.InfoWindow({
            content: `<div class='checkin-time'>${dateString}</div><div class='checkin-location'>${checkin.location}</div>
            <div class='checkin-area'>${checkin.area}</div><div class='checkin-latlng'>${checkin.lat}, ${checkin.lng}</div>`
        });

        this.checkinLocations.push(marker);

        marker.addListener('mouseover', () => {
            infoWindow.open(this.map, marker);
        });

        marker.addListener('mouseout', () => {
            infoWindow.close();
        });
    }
}