var ListPlaylists = require('../collections/list_playlists');
var ListTracks = require('../collections/list_tracks');

// AppStorage
module.exports = Backbone.Model.extend({
    defaults: { },

    initialize: function() {
        this.set('playlists', new ListPlaylists());
    },

    populate: function(data) {
        var current = {
            name: 'current',
            songs: new ListTracks(data.songs)
        };
        var keygeneration = {
            name: 'KEY-GENeration',
            songs: new ListTracks(_.filter(data.songs, function(s) {
                return (s.id % 4) === 0;
            }))
        };
        this.get('playlists').add([current, keygeneration]);
    }
});
