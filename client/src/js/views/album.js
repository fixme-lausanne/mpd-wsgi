var template = require('../../templates/album.html');

// AlbumView
module.exports = Backbone.View.extend({
    tagName: 'li',
    className: 'album',

    events: { },

    initialize: function() {
        this.$el.attr('data-cid', this.model.cid);
    },

    render: function() {
        this.$el.html(template(this.model.toJSON()));
        return this;
    }
});
