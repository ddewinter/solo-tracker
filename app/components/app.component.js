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
var person_tracker_service_1 = require('../services/person-tracker.service');
var AppComponent = (function () {
    function AppComponent(personTrackerService) {
        var _this = this;
        this.personTrackerService = personTrackerService;
        window['initMap'] = function () {
            _this.map = new google.maps.Map(_this.mapElementRef.nativeElement, {
                // Tiger Mountain
                center: { lat: 47.4883, lng: -121.9467 },
                zoom: 12
            });
            _this.personTrackerService.subscribe(function (locations) {
            });
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