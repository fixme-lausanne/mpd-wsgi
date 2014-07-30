var ArtistView = require('../views/artist');

// ListArtistsView
module.exports = Backbone.View.extend({
    el: '#list-artists',

    initialize: function() {
        this.listenTo(AppStorage.get('artists'),
                      'add remove', this.render);
        this.$ul = this.$('ul');
    },

    render: function() {
        this.$ul.empty();
        this.$ul.append(this.renderAll());
        return this;
    },

    renderOne: function(dataArtist) {
        var view = new ArtistView({ model: dataArtist });
        return view.render().$el;
    },

    renderAll: function() {
        return this.collection.map(this.renderOne, this);
    }
});
