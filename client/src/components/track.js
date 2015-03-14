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
        var attributes = this.model.toJSON();
        var t = Number(attributes.time).secondsToHours();
        attributes.time = t.hours.pad() + ':' + t.minutes.pad() + ':' + t.seconds.pad();
        this.$el.html(template(attributes));
        return this;
    },

    testClickTrack: function() {
        console.log('You have clicked on a track !');
        console.log(this);
    }
});
