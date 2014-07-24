var PlaylistView = require('../views/playlist');

// ListPlaylistsView
module.exports = Backbone.View.extend({
    el: '#list-playlists',

    initialize: function() {
        this.listenTo(AppStorage.get('playlists'),
                      'add remove', this.render);
        this.$ul = this.$('ul');
    },

    render: function() {
        this.$ul.empty();
        this.$ul.append(this.renderAll());
        return this;
    },

    renderOne: function(dataPlaylist) {
        var view = new PlaylistView({ model: dataPlaylist });
        return view.render().$el;
    },

    renderAll: function() {
        console.log('playlists: renderAll');
        return this.collection.map(this.renderOne, this);
    }
});
