import * as moment from 'moment';

export class CheckinLocation {
    lat: number;
    lng: number;
    location: string;
    area: string;
    date: moment.Moment;

    constructor(fireCheckin: any) {
        this.lat = fireCheckin.lat;
        this.lng = fireCheckin.lng;
        this.location = fireCheckin.location;
        this.area = fireCheckin.area;
        this.date = moment.unix(fireCheckin.$key);
    }

    formatDate(): string {
        return this.date.format('MMM D H:mm:ss A');
    }
}