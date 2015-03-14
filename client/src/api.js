/*jshint esnext: true*/
/*global require,module*/
var csp = require('js-csp'),
    request = require('superagent'),
    _ = require('lodash'),
    Config = require('../config.json');

function fetchInitialData() {
    var ch = csp.chan();
    request.get(Config.api + '/initial_data').end(function(error, res) {
        csp.putAsync(ch, {
            error: error,
            data: res.body,
            ok: res.ok
        });
    });
    return ch;
}

function queryInitialData() {
    return csp.go(function*() {
        var response = yield csp.take(fetchInitialData());
        var data = response.data;

        if (!response.ok) {
            throw response.error;
        }

        var currentPlaylist = {
            name: 'current',
            songs: _.sortBy(data.currentPlaylist, 'id')
        };

        var playlists = data.playlists.concat(currentPlaylist);

        return {
            currentSong: data.currentsong,
            currentPlaylist: data.currentplaylist,
            songs: data.songs,
            playlists: playlists,
            albums: byAlbum(data.songs),
            artists: byArtist(data.songs),
            status: data.status
        };
    });
}

function byAlbum(songs) {
    var attr = 'album',
        grouped = _.groupBy(songs, attr);
    return groupByAttr(grouped, attr, function(albumsSongs) {
        var albums = _.map(albumsSongs, function(songs, title) {
            return {
                title: title,
                songs: songs,
                album: this.key
            };
        });

        return {
            name: this.key,
            albums: albums
        };
    });
}

function byArtist(songs) {
    var attr = 'artist',
        grouped = _.groupBy(songs, attr);
    return groupByAttr(grouped, attr, function(artistsSongs) {
        var artists = _.map(artistsSongs, function(songs, title) {
            return {
                title: title,
                songs: songs,
                artist: this.key
            };
        });

        return {
            name: this.key,
            artists: artists
        };
    });
}

function groupByAttr(coll, attr, fn) {
    return _.chain(coll)
        .reduce(function(acc, values, key) {
            var context = {acc: acc, values: values, key: key};

            var grouped = _.groupBy(values, function(v) {
                return v[attr];
            });

            acc.push(fn.call(context, grouped));

            return acc;
        }, [])
        .flatten()
        .value();
}

module.exports = {
    queryInitialData: queryInitialData
};
