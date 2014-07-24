var ListTracks = require('../collections/list_tracks');

// Playlist
module.exports = Backbone.Model.extend({
    defaults: {
        selected: false
    },

    initialize: function() {
        this.set('songs', ListTracks);
    }
});
