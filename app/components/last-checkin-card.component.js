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
var checkin_location_1 = require('../../model/checkin-location');
var LastCheckinCardComponent = (function () {
    function LastCheckinCardComponent() {
    }
    __decorate([
        ngc.Input(), 
        __metadata('design:type', checkin_location_1.CheckinAgo)
    ], LastCheckinCardComponent.prototype, "ago", void 0);
    LastCheckinCardComponent = __decorate([
        ngc.Component({
            selector: 'last-checkin-card',
            templateUrl: 'app/components/last-checkin-card.component.html',
        }), 
        __metadata('design:paramtypes', [])
    ], LastCheckinCardComponent);
    return LastCheckinCardComponent;
}());
exports.LastCheckinCardComponent = LastCheckinCardComponent;
//# sourceMappingURL=last-checkin-card.component.js.map