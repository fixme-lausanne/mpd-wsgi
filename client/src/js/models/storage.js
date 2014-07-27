var ListAlbums = require('../collections/list_albums');
var ListPlaylists = require('../collections/list_playlists');
var ListTracks = require('../collections/list_tracks');

// AppStorage
module.exports = Backbone.Model.extend({
    defaults: { },

    initialize: function() {
        this.set('albums', new ListAlbums());
        this.set('playlists', new ListPlaylists());
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
    }
});
