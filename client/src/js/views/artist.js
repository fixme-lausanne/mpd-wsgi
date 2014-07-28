var template = require('../../templates/artist.html');

// ArtistView
module.exports = Backbone.View.extend({
    tagName: 'li',
    className: 'artist',

    events: {
        'click': 'select'
    },

    initialize: function() {
        this.$el.attr('data-cid', this.model.cid);
    },

    render: function() {
        this.$el.html(template(this.model.toJSON()));
        return this;
    },

    select: function() {
        this.model.set({selected: true});
    }
});
