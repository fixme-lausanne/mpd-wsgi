/*global require,module*/
function secondsToHours() {
    var hours = Math.floor(this / 3600);
    var hours_rem = this % 3600;
    var minutes = Math.floor(hours_rem / 60);
    var seconds = hours_rem % 60;

    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}

function pad(size) {
    var s = String(this);
    if (typeof(size) !== "number"){
        size = 2;
    }
    while (s.length < size) {
        s = "0" + s;
    }
    return s;
}

module.exports = {
    secondsToHours: secondsToHours,
    pad: pad
};
