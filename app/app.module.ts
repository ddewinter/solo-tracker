import { NgModule }                          from '@angular/core';
import { BrowserModule }                     from '@angular/platform-browser';
import { HttpModule }                        from '@angular/http';

import { AppComponent }                      from './components/app.component';

import { AngularFireModule }                 from 'angularfire2';

import { PersonTrackerService }                from './services/person-tracker.service';

// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyBFGJHlZ7VUtRRx___nCDiCk2kRQCbtMNc",//iFYaeT8KoYLiLdOVqRyZyoaWxs6dcMcTS3sGIdIk",//gYoLpSjvXsLBAVGBOlYQs2IBIlvtgv71NmuRXHqS",//AIzaSyDsVTaJKMvz_u3V3yD5q1b4qPLUvHPTTpU",
    authDomain: "solotracker-61ff4.firebaseapp.com",
    databaseURL: "https://solotracker-61ff4.firebaseio.com/",
    storageBucket: "solotracker-61ff4.appspot.com",
    messagingSenderId: "791720776314"
};

@NgModule ({
    imports:      [ BrowserModule, HttpModule, AngularFireModule.initializeApp(firebaseConfig) ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ],
    providers:    [ PersonTrackerService ]
})
export class AppModule { }