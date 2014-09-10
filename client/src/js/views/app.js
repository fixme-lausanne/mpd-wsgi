var ControlsView = require('../views/controls');
var ListTabsView = require('../views/list_tabs');

var TabAlbums = require('./tab_albums.jsx');
var TabPlaylists = require('./tab_playlists.jsx');
var TabArtists = require('./tab_artists.jsx');

var TabGenresView = require('../views/tab_genres');
var TabSongsView = require('../views/tab_songs');

var AppRouter = require('../routers/app');

// AppView
module.exports = Backbone.View.extend({
    el: 'body',

    initialize: function(config) {
        this.controlsView = new ControlsView();
        this.tabbarView = new ListTabsView();

        AppRouter.on('route:root', _.bind(this.tabAlbums, this));
        AppRouter.on('route:albums', _.bind(this.tabAlbums, this));
        AppRouter.on('route:artists', _.bind(this.tabArtists, this));
        AppRouter.on('route:genres', _.bind(this.tabGenres, this));
        AppRouter.on('route:playlists', _.bind(this.tabPlaylists, this));
        AppRouter.on('route:songs', _.bind(this.tabSongs, this));

        Backbone.history.start();

        $.when(this.fechDataOnLoad())
            .done(_.bind(AppStorage.populate, AppStorage))
            .fail(_.bind(this.handleFailure, this));
    },

    tabAlbums: function() {
        React.renderComponent(TabAlbums(),
                              document.getElementById('tab-content'));
    },

    tabArtists: function() {
        React.renderComponent(TabArtists(),
                              document.getElementById('tab-content'));
    },

    tabGenres: function() {
        this.currentView = new TabGenresView();
        this.currentView.render();
    },

    tabPlaylists: function() {
        React.renderComponent(TabPlaylists(),
                              document.getElementById('tab-content'));
    },

    tabSongs: function() {
        this.currentView = new TabSongsView();
        this.currentView.render();
    },

    fechDataOnLoad: function() {
        return $.ajax({
            type: 'GET',
            url: AppConfig.api + '/initial_data'
        });
    },

    handleFailure: function(xhr, err, status) {
        console.error(xhr, err, status);
    }
});
