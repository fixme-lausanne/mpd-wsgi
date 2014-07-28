var AlbumView = require('../views/album');

// ListAlbumsView
module.exports = Backbone.View.extend({
    el: '#list-albums',

    initialize: function() {
        this.listenTo(AppStorage.get('artists'),
                      'change:selected', this.setAlbums);
        this.listenTo(AppStorage.get('albums'),
                      'add remove', this.render);
    },

    render: function() {
        this.$el.empty();
        this.$el.append(this.renderAll());
        return this;
    },

    renderOne: function(dataAlbum) {
        var view = new AlbumView({ model: dataAlbum });
        return view.render().$el;
    },

    renderAll: function() {
        if (_.isEmpty(this.collection)) { return this; }

        return this.collection.map(this.renderOne, this);
    },

    setAlbums: function() {
        this.collection = AppStorage.get('artists')
            .findWhere({selected: true})
            .get('albums');
        this.render();
    }
});
