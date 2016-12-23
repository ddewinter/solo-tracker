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
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var app_component_1 = require('./components/app.component');
var last_checkin_card_component_1 = require('./components/last-checkin-card.component');
var angularfire2_1 = require('angularfire2');
var person_tracker_service_1 = require('./services/person-tracker.service');
// Must export the config
exports.firebaseConfig = {
    apiKey: "AIzaSyBFGJHlZ7VUtRRx___nCDiCk2kRQCbtMNc",
    authDomain: "solotracker-61ff4.firebaseapp.com",
    databaseURL: "https://solotracker-61ff4.firebaseio.com/",
    storageBucket: "solotracker-61ff4.appspot.com",
    messagingSenderId: "791720776314"
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, angularfire2_1.AngularFireModule.initializeApp(exports.firebaseConfig)],
            declarations: [app_component_1.AppComponent, last_checkin_card_component_1.LastCheckinCardComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [person_tracker_service_1.PersonTrackerService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map