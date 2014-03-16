if (window.mpd === undefined) {
    window.mpd = {};
}

window.mpd.song = function(data) {
    // Song wrapper
    this.title = data.title || 'unknown title';
    this.artist = data.artist || 'unknown artist';
    this.album = data.album || 'unknown album';
    this.filename = data.filename || 'unkown filename';
    this.position = data.pos || null;
};
