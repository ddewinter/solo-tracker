import * as ngc from '@angular/core';

import { PersonTrackerService } from '../services/person-tracker.service';
import { CheckinLocation } from '../model/checkin-location';

@ngc.Component({
    selector: 'solo-tracker',
    templateUrl: 'app/components/app.component.html',
})
export class AppComponent implements ngc.AfterViewInit {
    @ngc.ViewChild('mapContainer') private mapContainerElementRef: ngc.ElementRef
    @ngc.ViewChild('map') private mapElementRef: ngc.ElementRef

    private map: google.maps.Map;
    private pathLines: Array<google.maps.Polyline> = new Array<google.maps.Polyline>();
    private checkinLocations: Array<google.maps.Marker> = new Array<google.maps.Marker>();

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

    private addNewMarker(location: CheckinLocation) {
        // TODO: Marker Caption: address and time
        let marker = new google.maps.Marker({
            position: {
                lat: location.lat,
                lng: location.lng
            },
            map: this.map
        });

        this.checkinLocations.push(marker);
    }
}