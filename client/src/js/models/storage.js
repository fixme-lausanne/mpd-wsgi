var ListPlaylists = require('../collections/list_playlists');

// AppStorage
module.exports = Backbone.Model.extend({
    defaults: { },

    initialize: function() {
        this.set('playlists', ListPlaylists);
    },

    populate: function(data) {
        var current = {name: 'current', songs: data.songs};
        this.get('playlists').populate([current]);
    }
});
