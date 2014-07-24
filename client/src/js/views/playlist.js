var template = require('../../templates/playlist.html');

// PlaylistView
module.exports = Backbone.View.extend({
    tagName: 'li',
    className: 'playlist',

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
        console.log(this.model);
        this.model.set({selected: true});
    }
});
