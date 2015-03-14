// Convert seconds to hours, minutes, seconds
Number.prototype.secondsToHours = function() {
    var hours = Math.floor(this / 3600);
    var hours_rem = this % 3600;
    var minutes = Math.floor(hours_rem / 60);
    var seconds = hours_rem % 60;

    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
};

// Leading zeros
Number.prototype.pad = function(size) {
    var s = String(this);
    if (typeof(size) !== "number"){
        size = 2;
    }
    while (s.length < size) {
        s = "0" + s;
    }
    return s;
};
