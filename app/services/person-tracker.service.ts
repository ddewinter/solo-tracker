import { Injectable } from '@angular/core';

import * as af from 'angularfire2';

import { CheckinLocation } from '../../model/checkin-location';

@Injectable()
export class PersonTrackerService {
    private checkins: af.FirebaseListObservable<any[]>

    constructor(ngFire: af.AngularFire) {
        this.checkins = ngFire.database.list('/checkins');
    }
    
    subscribe(subscription: (locations: CheckinLocation[]) => void) {
        this.checkins.subscribe(items => subscription(items.map(i => new CheckinLocation(i))));
    }
}