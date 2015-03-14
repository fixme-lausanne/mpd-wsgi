var Playlist = require('../models/playlist');
var ListTracks = require('../collections/list_tracks');

// ListPlaylists
module.exports = Backbone.Collection.extend({
    model: Playlist,
    comparator: 'title',

    initialize: function() {
        this.on('change:selected', this.selectPlaylist, this);
    },

    selectPlaylist: function(model, value, options) {
        this.chain()
            .reject(function(m) { return m.cid === model.cid; })
            .each(function(m) { m.attributes.selected = false; });
        return this;
    }
});
