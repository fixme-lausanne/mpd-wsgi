var Artist = require('../models/artist');

// ListArtists
module.exports = Backbone.Collection.extend({
    model: Artist,
    comparator: 'title',

    initialize: function() {
        this.on('change:selected', this.selectArtist, this);
    },

    selectArtist: function(model, value, options) {
        this.chain()
            .reject(function(m) { return m.cid === model.cid; })
            .each(function(m) { m.attributes.selected = false; });
        return this;
    }
});
