if (window.mpd === undefined) {
    window.mpd = {};
}

window.mpd.viewmodel = function() {
    var config = window.mpd.config;
    var playerActions = window.mpd.playerActions;
    var playlistActions = window.mpd.playlistActions;

    this.getCurrent = function() {
        $.ajax({
            url: config.urlCurrent,
            context: this
        }).done(function(data) {
            this.current(new window.mpd.song(data));
        }).fail(function(xhr, status, err) {
            window.mpd.utils.logErrors('getCurrent', {
                xhr: xhr, status: status, error: err
            });
            this.current({
                title: 'Title: error', artist: 'Artist: error',
                album: 'Album: error'
            });
        });
    };

    this.getPlaylist = function() {
        $.ajax({
            url: config.urlPlaylist,
            context: this
        }).done(function(data) {
            var songs  = $.map(data.songs, function(item){
                return new window.mpd.song(item);
            });

            this.playlist(songs);
        }).fail(function(xhr, status, err) {
            window.mpd.utils.logErrors('getPlaylist', {
                xhr: xhr, status: status, error: err
            });
            this.playlist({
                error: 'Playlist: error'
            });
        });
    };

    this.getCover = function() {
        $.ajax({
            url: config.urlCover,
            context: this
        }).done(function(data) {
            this.covers(data || window.mpd.config.defaultCover);
        }).fail(function(xhr, status, err) {
            window.mpd.utils.logErrors('getCover', {
                xhr: xhr, status: status, error: err
            });
            this.covers(window.mpd.config.defaultCover);
        });
    };

    this.getStatus = function() {
        $.ajax({
            url: config.urlStatus,
            context: this
        }).done(function(data) {
            this.status(data);
        }).fail(function(xhr, status, err) {
            window.mpd.utils.logErrors('getStatus', {
                xhr: xhr, status: status, error: err
            });
            this.status({state: 'stop'});
        });
    };

    this.search = function() {
        var searchString = this.searchText();
        var filter = this.searchFilter();

        if (searchString.length > 3) {
            var url =
                config.urlSearch + '?' + filter + '=' + searchString +
                '&limit=' + config.searchLimit;

            $.ajax({
                url: url,
                context: this
            }).done(function(data) {
                var songs = $.map(data.songs, function(item) {
                    return new window.mpd.song(item);
                });
                this.searchResult(songs);
            }).fail(function(xhr, status, err) {
                window.mpd.utils.logErrors('search', {
                    xhr: xhr, status: status, error: err,
                    filter: filter, search: searchString
                });
                this.searchResult({
                    error: 'Search: error'
                });
            });
        } else {
            this.searchResult([]);
        }
    };

    this.loadUi = function() {
        this.getStatus();
        this.getCover();
        this.getPlaylist();
        this.getCurrent();
    };


    // Constructor
    (function init(context) {
        context.current = ko.observable('');
        context.playerActions = new window.mpd.player.actions();
        context.playlistActions = new window.mpd.playlist.actions();
        context.playlist = ko.observableArray([]);
        context.covers = ko.observable('');
        context.searchText = ko.observable('');
        context.searchFilter = ko.observable('any');
        context.searchResult = ko.observableArray([]);
        context.fileUrl = ko.observable(config.urlFile);
        context.status = ko.observable({state: 'stop'});

        context.isCurrent = function(index) {
            return index().toString() === context.current().position;
        };

        context.loadUi();
    })(this);
};
