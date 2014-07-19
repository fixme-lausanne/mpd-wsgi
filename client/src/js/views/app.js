var ControlsView = require('../views/controls');
var ListTabsView = require('../views/list_tabs');

var TabAlbumsView = require('../views/tab_albums');
var TabArtistsView = require('../views/tab_artists');
var TabGenresView = require('../views/tab_genres');
var TabPlaylistsView = require('../views/tab_playlists');
var TabSongsView = require('../views/tab_songs');

var AppRouter = require('../routers/app');

// AppView
module.exports = Backbone.View.extend({
    el: 'body',

    initialize: function() {
        AppRouter.on('route:root', _.bind(this.tabAlbums, this));
        AppRouter.on('route:albums', _.bind(this.tabAlbums, this));
        AppRouter.on('route:artists', _.bind(this.tabArtists, this));
        AppRouter.on('route:genres', _.bind(this.tabGenres, this));
        AppRouter.on('route:playlists', _.bind(this.tabPlaylists, this));
        AppRouter.on('route:songs', _.bind(this.tabSongs, this));

        Backbone.history.start();

        this.controlsView = new ControlsView();
        this.tabbarView = new ListTabsView();

        $(document).foundation();
    },

    tabAlbums: function() {
        this.currentView = new TabAlbumsView();
    },

    tabArtists: function() {
        this.currentView = new TabArtistsView();
    },

    tabGenres: function() {
        this.currentView = new TabGenresView();
    },

    tabPlaylists: function() {
        this.currentView = new TabPlaylistsView();
    },

    tabSongs: function() {
        this.currentView = new TabSongsView();
    }
});
