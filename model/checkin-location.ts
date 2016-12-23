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

    ago(): CheckinAgo {
        let diffSeconds = moment().diff(this.date) / 1000;

        if (diffSeconds < 60) {
            return new CheckinAgo(diffSeconds, 'seconds ago');
        }

        let diffMinutes = diffSeconds / 60;
        if (diffMinutes < 60) {
            return new CheckinAgo(diffMinutes, 'minutes ago');
        }

        let diffHours = diffMinutes / 60;
        if (diffHours < 24) {
            return new CheckinAgo(diffHours, 'hours ago');
        }

        return new CheckinAgo(diffHours / 24, 'days ago');
    }

    formatDate(): string {
        return this.date.format('MMM D H:mm:ss A');
    }
}

export class CheckinAgo {
    constructor(public number: number, public agoText: string) {
        this.number = Math.floor(number);
    }
}