var getByAlbums = function(songs) {
    var byAlbums = _.groupBy(songs, 'album');
    return groupByAttr(byAlbums, 'artist', function(artistsSongs) {
        return _.map(artistsSongs, function(songs, artist) {
            return {
                title: this.key,
                songs: songs,
                artist: artist
            };
        }, this);
    });
};

var getByArtists = function(songs) {
    var byArtists = _.groupBy(songs, 'artist');
    return groupByAttr(byArtists, 'album', function(albumsSongs) {
        var albums = _.map(albumsSongs, function(songs, title) {
            return {
                title: title,
                songs: songs,
                artist: this.key
            };
        });

        return { name: this.key, albums: albums };
    });
};

var groupByAttr = function(coll, attr, fn) {
    return _.chain(coll)
        .reduce(function(acc, values, key) {
            var context = {acc: acc, values: values, key: key};

            var grouped = _.groupBy(values, function(v) {
                return _.property(attr)(v);
            });

            acc.push(fn.call(context, grouped));

            return acc;
        }, [])
        .flatten()
        .value();
};

var Storage = {
    defaultState: {
        currentPlaylist: {},
        currentSong: {},

        songs: [],
        albums: [],
        artists: [],
        playlists: []
    },

    populate: function(data) {
        var currentSong = data.currentsong || [];
        var currentPlaylist = {
            name: 'current',
            songs: data.currentplaylist || []
        };

        var songs = data.songs;
        var playlists = _.flatten([currentPlaylist, data.playlists]);
        var albums = getByAlbums(data.songs) || [];
        var artists = getByArtists(data.songs) || [];

        return {
            currentSong: currentSong,
            currentPlaylist: currentPlaylist,
            albums: albums,
            artists: artists,
            playlists: playlists,
            songs: songs
        };
    }
};

module.exports = Storage;
