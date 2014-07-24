var template = require('../../templates/track.html');

// TrackView
module.exports = Backbone.View.extend({
    tagName: 'tr',
    className: 'track',

    events: {
        'click': 'testClickTrack'
    },

    initialize: function() {
        this.$el.attr('data-cid', this.model.cid);
    },

    render: function() {
        this.$el.html(template(this.model.toJSON()));
        return this;
    },

    testClickTrack: function() {
        console.log('You have clicked on a track !');
        console.log(this);
    }
});
