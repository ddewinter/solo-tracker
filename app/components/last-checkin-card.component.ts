import * as ngc from '@angular/core';
import * as moment from 'moment';

import { PersonTrackerService } from '../services/person-tracker.service';
import { CheckinAgo } from '../../model/checkin-location';

@ngc.Component({
    selector: 'last-checkin-card',
    templateUrl: 'app/components/last-checkin-card.component.html',
})
export class LastCheckinCardComponent {
    @ngc.Input()
    public ago: CheckinAgo
}