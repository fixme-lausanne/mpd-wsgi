var template = require('../../templates/content-playlists.html');

// TabPlaylistsView
module.exports = Backbone.View.extend({
    el: '#tab-content',

    initialize: function() {
        this.$el.html(template());
    }
});
