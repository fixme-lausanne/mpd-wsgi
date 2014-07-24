var Playlist = require('../models/playlist');
var ListTracks = require('../collections/list_tracks');

var ListPlaylists = Backbone.Collection.extend({
    model: Playlist,
    comparator: 'title',

    initialize: function() {
        this.on('change:selected', this.selectPlaylist, this);
    },

    populate: function(dataPlaylist) {
        _.each(dataPlaylist, function(elem) {
            this.add({
                name: elem.name,
                songs: ListTracks.populate(elem.songs)
            });
        }, this);
    },

    selectPlaylist: function(model, value, options) {
        this.chain()
            .reject(function(m) { return m.cid === model.cid; })
            .each(function(m) { return m.set({selected: false}); });
        return this;
    }
});

module.exports = new ListPlaylists();
