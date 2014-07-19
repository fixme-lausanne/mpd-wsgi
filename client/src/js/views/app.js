var ControlsView = require('../views/controls');
var ListTabsView = require('../views/list_tabs');

var TabAlbumsView = require('../views/tab_albums');
 var TabSongsView = require('../views/tab_songs');

var AppRouter = require('../routers/app');

// AppView
module.exports = Backbone.View.extend({
    el: 'body',

    initialize: function() {
        AppRouter.on('route:root', _.bind(this.tabAlbums, this));
        AppRouter.on('route:albums', _.bind(this.tabAlbums, this));
        AppRouter.on('route:songs', _.bind(this.tabSongs, this));

        Backbone.history.start();

        debugger;

        this.controlsView = new ControlsView();
        this.tabbarView = new ListTabsView();

        $(document).foundation();
    },

    tabAlbums: function() {
        console.log('tabSongs');
        this.currentView = new TabAlbumsView();
    },

    tabSongs: function() {
        console.log('tabSongs');
        this.currentView = new TabSongsView();
    }
});
