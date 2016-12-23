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
            return new CheckinAgo(diffSeconds, Math.floor(diffSeconds) == 1 ? 'second ago' : 'seconds ago', diffSeconds);
        }

        let diffMinutes = diffSeconds / 60;
        if (diffMinutes < 60) {
            return new CheckinAgo(diffMinutes, Math.floor(diffMinutes) == 1 ? 'minute ago' : 'minutes ago', diffSeconds);
        }

        let diffHours = diffMinutes / 60;
        if (diffHours < 24) {
            return new CheckinAgo(diffHours, Math.floor(diffHours) == 1 ? 'hour ago' : 'hours ago', diffSeconds);
        }

        let diffDays = diffHours / 24;
        return new CheckinAgo(diffDays, Math.floor(diffDays) == 1 ? 'day ago' : 'days ago', diffSeconds);
    }

    formatDate(): string {
        return this.date.format('MMM D H:mm:ss A');
    }
}

export class CheckinAgo {
    constructor(public number: number, public agoText: string, private totalSeconds: number) {
        this.number = Math.floor(number);
    }

    color(): string {
        if (this.totalSeconds < 60 * 60 * 4) {
            return '#00B200';
        } else if (this.totalSeconds >= 60 * 60 * 8) {
            return '#FF0000';
        }

        return '#FF8000';
    }
}