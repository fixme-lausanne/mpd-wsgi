var ListAlbums = require('../collections/list_albums');

var ListAlbumsView = require('../views/list_albums');

var template = require('../../templates/content-albums.html');

// TabAlbumsView
module.exports = Backbone.View.extend({
    el: '#tab-content',

    children: {
        listAlbums: null
    },

    initialize: function() {
        this.$el.html(template());
    },

    render: function() {
        this.renderListAlbums();
        return this;
    },

    renderListAlbums: function() {
        var view = new ListAlbumsView({
            collection: AppStorage.get('albums')
        });
        this.children.listAlbums = view.render();
    }
});
