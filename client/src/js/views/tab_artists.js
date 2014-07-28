var ListAlbums = require('../collections/list_albums');
var ListArtists = require('../collections/list_artists');

var ListAlbumsView = require('../views/list_albums');
var ListArtistsView = require('../views/list_artists');

var template = require('../../templates/content-artists.html');

// TabArtistsView
module.exports = Backbone.View.extend({
    el: '#tab-content',

    children: {
        listAlbums: null,
        listArtists: null
    },

    initialize: function() {
        this.$el.html(template());
    },

    render: function() {
        this.renderListAlbums();
        this.renderListArtists();
        return this;
    },

    renderListAlbums: function() {
        var view = new ListAlbumsView();
        this.children.listAlbums = view.render();
    },

    renderListArtists: function() {
        var view = new ListArtistsView({
            collection: AppStorage.get('artists')
        });
        this.children.listArtists = view.render();
    }
});
