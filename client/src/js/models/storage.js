var ListAlbums = require('../collections/list_albums');
var ListArtists = require('../collections/list_artists');
var ListGenres = require('../collections/list_genres');
var ListPlaylists = require('../collections/list_playlists');
var ListTracks = require('../collections/list_tracks');

// AppStorage
module.exports = Backbone.Model.extend({
    defaults: { },

    initialize: function() {
        this.set('albums', new ListAlbums());
        this.set('playlists', new ListPlaylists());
        this.set('artists', new ListArtists());
        // this.set('genres', new ListGenres());
    },

    populate: function(data) {
        // Playlists
        var current = {
            name: 'current',
            songs: new ListTracks(data.playlists)
        };
        var keygeneration = {
            name: 'KEY-GENeration',
            songs: new ListTracks(_.filter(data.playlists, function(s) {
                return (s.id % 4) === 0;
            }))
        };

        this.get('playlists').add([current, keygeneration]);

        // Albums
        var albums = _.chain(data.albums)
            .reduce(function(acc, artists, title) {
                acc.push(_.map(artists, function(artist) {
                    return {title: title, artist: artist};
                }));
                return acc;
            }, [])
            .flatten()
            .value();

        this.get('albums').add(albums);

        // Artists
        var artists = _.map(data.artists, function(albums, artist) {
            var listAlbums = new ListAlbums(_.map(albums, function(album) {
                return {title: album, artist: artist};
            }));
            return {name: artist, albums: listAlbums};
        });

        this.get('artists').add(artists);

        // Genres
        // var genres = null;
        // this.get('genres').add(genres);
    }
});
