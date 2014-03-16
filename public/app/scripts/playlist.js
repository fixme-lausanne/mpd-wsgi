if (window.mpd == undefined) {
    window.mpd = {};
}

window.mpd.playlist = new function() {
    var config = window.mpd.config;

    // Manage playlist actions
    var _sendPlaylistAction = function(type, data, url) {
        var url = url || urlPlaylist;

        $.ajax({
            url: url,
            type: type,
            data: data,
            context: {data: data, url: url, type: type}
        }).done(function(data) {
            window.mpd.vm.loadUi();
        }).fail(function(xhr, status, err) {
            window.mpd.utils.logErrors(this.type, {
                xhr: xhr, status: status, error: err,
                url: this.url, data: this.data
            });
        });
    };

    this.actions = function() {
        this.add = function(song) {
            _sendPlaylistAction('PUT', {song: song.filename});
        };

        this.delete = function(index) {
            _sendPlaylistAction('DELETE', null,
                                config.urlPlaylist + '/' + index());
        };

        this.clear = function() {
            _sendPlaylistAction('DELETE');
        };
    };
}
