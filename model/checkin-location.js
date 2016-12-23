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
            return new CheckinAgo(diffSeconds, 'seconds ago');
        }
        var diffMinutes = diffSeconds / 60;
        if (diffMinutes < 60) {
            return new CheckinAgo(diffMinutes, 'minutes ago');
        }
        var diffHours = diffMinutes / 60;
        if (diffHours < 24) {
            return new CheckinAgo(diffHours, 'hours ago');
        }
        return new CheckinAgo(diffHours / 24, 'days ago');
    };
    CheckinLocation.prototype.formatDate = function () {
        return this.date.format('MMM D H:mm:ss A');
    };
    return CheckinLocation;
}());
exports.CheckinLocation = CheckinLocation;
var CheckinAgo = (function () {
    function CheckinAgo(number, agoText) {
        this.number = number;
        this.agoText = agoText;
        this.number = Math.floor(number);
    }
    return CheckinAgo;
}());
exports.CheckinAgo = CheckinAgo;
//# sourceMappingURL=checkin-location.js.map