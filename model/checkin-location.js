"use strict";
var moment = require('moment');
var CheckinLocation = (function () {
    function CheckinLocation(fireCheckin) {
        this.lat = fireCheckin.lat;
        this.lng = fireCheckin.lng;
        this.location = fireCheckin.location;
        this.area = fireCheckin.area;
        this.date = moment.unix(fireCheckin.$key);
    }
    CheckinLocation.prototype.ago = function () {
        var diffSeconds = moment().diff(this.date) / 1000;
        if (diffSeconds < 60) {
            return new CheckinAgo(diffSeconds, Math.floor(diffSeconds) == 1 ? 'second ago' : 'seconds ago', diffSeconds);
        }
        var diffMinutes = diffSeconds / 60;
        if (diffMinutes < 60) {
            return new CheckinAgo(diffMinutes, Math.floor(diffMinutes) == 1 ? 'minute ago' : 'minutes ago', diffSeconds);
        }
        var diffHours = diffMinutes / 60;
        if (diffHours < 24) {
            return new CheckinAgo(diffHours, Math.floor(diffHours) == 1 ? 'hour ago' : 'hours ago', diffSeconds);
        }
        var diffDays = diffHours / 24;
        return new CheckinAgo(diffDays, Math.floor(diffDays) == 1 ? 'day ago' : 'days ago', diffSeconds);
    };
    CheckinLocation.prototype.formatDate = function () {
        return this.date.format('MMM D H:mm:ss A');
    };
    return CheckinLocation;
}());
exports.CheckinLocation = CheckinLocation;
var CheckinAgo = (function () {
    function CheckinAgo(number, agoText, totalSeconds) {
        this.number = number;
        this.agoText = agoText;
        this.totalSeconds = totalSeconds;
        this.number = Math.floor(number);
    }
    CheckinAgo.prototype.color = function () {
        if (this.totalSeconds < 60 * 60 * 4) {
            return '#00B200';
        }
        else if (this.totalSeconds >= 60 * 60 * 8) {
            return '#FF0000';
        }
        return '#FF8000';
    };
    return CheckinAgo;
}());
exports.CheckinAgo = CheckinAgo;
//# sourceMappingURL=checkin-location.js.map