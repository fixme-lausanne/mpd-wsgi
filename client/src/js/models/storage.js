var Track = require('../models/track');
var Playlist = require('../models/playlist');

var ListAlbums = require('../collections/list_albums');
var ListArtists = require('../collections/list_artists');
var ListGenres = require('../collections/list_genres');
var ListPlaylists = require('../collections/list_playlists');
var ListTracks = require('../collections/list_tracks');

// AppStorage
module.exports = Backbone.Model.extend({

    initialize: function() {
        this.set('tracks', new ListTracks());
        this.set('albums', new ListAlbums());
        this.set('playlists', new ListPlaylists());
        this.set('artists', new ListArtists());

        this.set('currentTrack', new Track());
        this.set('currentPlaylist', new Playlist());
    },

    populate: function(data) {
        this.get('tracks').add(data.songs);

        // Current playlist
        var current = {
            name: 'current',
            songs: new ListTracks(data.playlists)
        };

        this.get('currentPlaylist').set(current);

        // Playlists
        var modulo2 = {
            name: 'modulo2',
            songs: new ListTracks(_.filter(data.playlists, function(s) {
                return (s.id % 2) === 0;
            }))
        };

        var keygeneration = {
            name: 'KEY-GENeration',
            songs: new ListTracks(_.filter(data.playlists, function(s) {
                return (s.id % 4) === 0;
            }))
        };

        this.get('playlists').add([current, modulo2, keygeneration]);

        // Albums
        var albums = this.getByAlbums();
        this.get('albums').add(albums);

        // Artists
        var artists = this.getByArtists();
        this.get('artists').add(artists);
    },

    getAlbums: function() {
        return this.get('tracks').groupBy('album');
    },

    getByAlbums: function() {
        var byAlbums = this.getAlbums();
        return this.groupByAttr(byAlbums, 'artist', function(artistsTracks) {
            return _.map(artistsTracks, function(tracks, artist) {
                return {
                    title: this.key,
                    tracks: new ListTracks(tracks),
                    artist: artist
                };
            }, this);
        });
    },

    getArtists: function() {
        return this.get('tracks').groupBy('artist');
    },

    getByArtists: function() {
        var byArtists = this.getArtists();
        return this.groupByAttr(byArtists, 'album', function(albumsTracks) {
            var albums = _.map(albumsTracks, function(tracks, title) {
                return {
                    title: title,
                    tracks: new ListTracks(tracks),
                    artist: this.key
                };
            });

            return { name: this.key, albums: new ListAlbums(albums) };
        });
    },

    groupByAttr: function(coll, attr, fn) {
        return _.chain(coll)
            .reduce(function(acc, values, key) {
                var context = {acc: acc, values: values, key: key};

                var grouped = _.groupBy(values, function(v) {
                    return v.get(attr);
                });

                acc.push(fn.call(context, grouped));

                return acc;
            }, [])
            .flatten()
            .value();

        // Genres
        // var genres = null;
        // this.get('genres').add(genres);
    }
});
