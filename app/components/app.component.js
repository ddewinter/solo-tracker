"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ngc = require('@angular/core');
var moment = require('moment');
var person_tracker_service_1 = require('../services/person-tracker.service');
var AppComponent = (function () {
    function AppComponent(personTrackerService) {
        var _this = this;
        this.personTrackerService = personTrackerService;
        this.pathLines = new Array();
        this.checkinLocations = new Array();
        this.infoWindows = new Array();
        window['initMap'] = function () {
            _this.map = new google.maps.Map(_this.mapElementRef.nativeElement, {
                // Tiger Mountain
                center: { lat: 47.4883, lng: -121.9467 },
                zoom: 11
            });
            _this.personTrackerService.subscribe(function (locations) { return _this.onNewLocations(locations); });
        };
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        this.fillMapToClientBounds();
        var node = document.createElement('script');
        node.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDuUvDZsuhwVYScoNpK6Id4SEC3jQ73YSI&callback=initMap';
        node.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(node);
    };
    AppComponent.prototype.fillMapToClientBounds = function () {
        var mapElement = this.mapContainerElementRef.nativeElement;
        var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var height = Math.min(document.documentElement.clientHeight, window.innerHeight || 0);
        mapElement.style.width = width;
        mapElement.style.height = height;
    };
    AppComponent.prototype.onNewLocations = function (locations) {
        var currentLocationCount = this.checkinLocations.length;
        var newLocationCount = locations.length;
        for (var i = currentLocationCount; i < newLocationCount; ++i) {
            var location_1 = locations[i];
            this.addNewMarker(location_1);
            if (i > 0) {
                this.addNewPathLine(location_1, locations[i - 1]);
            }
        }
        this.map.setCenter(this.checkinLocations[this.checkinLocations.length - 1].getPosition());
    };
    AppComponent.prototype.addNewPathLine = function (location, lastLocation) {
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
        var polyline = new google.maps.Polyline({
            path: coordinates,
            geodesic: true,
            strokeColor: '#FF8000',
            strokeOpacity: 1,
            strokeWeight: 4,
            map: this.map
        });
        this.pathLines.push(polyline);
    };
    AppComponent.prototype.addNewMarker = function (checkin) {
        var _this = this;
        var marker = new google.maps.Marker({
            position: {
                lat: checkin.lat,
                lng: checkin.lng
            },
            map: this.map
        });
        var date = moment.unix(checkin.$key);
        var dateString = date.format('MMM D H:mm:ss A');
        var infoWindow = new google.maps.InfoWindow({
            content: "<div class='checkin-time'>" + dateString + "</div><div class='checkin-location'>" + checkin.location + "</div>\n            <div class='checkin-area'>" + checkin.area + "</div><div class='checkin-latlng'>" + checkin.lat + ", " + checkin.lng + "</div>"
        });
        this.checkinLocations.push(marker);
        marker.addListener('mouseover', function () {
            infoWindow.open(_this.map, marker);
        });
        marker.addListener('mouseout', function () {
            infoWindow.close();
        });
    };
    __decorate([
        ngc.ViewChild('mapContainer'), 
        __metadata('design:type', ngc.ElementRef)
    ], AppComponent.prototype, "mapContainerElementRef", void 0);
    __decorate([
        ngc.ViewChild('map'), 
        __metadata('design:type', ngc.ElementRef)
    ], AppComponent.prototype, "mapElementRef", void 0);
    AppComponent = __decorate([
        ngc.Component({
            selector: 'solo-tracker',
            templateUrl: 'app/components/app.component.html',
        }), 
        __metadata('design:paramtypes', [person_tracker_service_1.PersonTrackerService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map