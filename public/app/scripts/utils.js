if (window.mpd == undefined) {
    window.mpd = {};
}

window.mpd.utils = new function() {
    this.logErrors = function(callername, data) {
        console.log(callername + " has failed.");
        console.error(data);

        return data;
    };
}
