var ListTracks = require('../collections/list_tracks');
var ListPlaylists = require('../collections/list_playlists');

var ListTracksView = require('../views/list_tracks');
var ListPlaylistsView = require('../views/list_playlists');

var template = require('../../templates/content-playlists.html');

// TabPlaylistsView
module.exports = Backbone.View.extend({
    el: '#tab-content',

    children: {
        listTracks: null,
        listPlaylists: null
    },

    initialize: function() {
        this.$el.html(template());
    },

    render: function() {
        this.renderListPlaylists();
        this.renderListTracks();
        return this;
    },

    renderListTracks: function() {
        new ListTracks(AppStorage.get('playlists').get('songs'));
        var view = new ListTracksView({
            collection: AppStorage.get('playlists').get('songs')
        });
        this.children.listTracks = view.render();
    },

    renderListPlaylists: function() {
        var view = new ListPlaylistsView({
            collection: AppStorage.get('playlists')
        });
        this.children.listPlaylists = view.render();
    }
});
