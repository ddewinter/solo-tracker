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
    CheckinLocation.prototype.formatDate = function () {
        return this.date.format('MMM D H:mm:ss A');
    };
    return CheckinLocation;
}());
exports.CheckinLocation = CheckinLocation;
//# sourceMappingURL=checkin-location.js.map