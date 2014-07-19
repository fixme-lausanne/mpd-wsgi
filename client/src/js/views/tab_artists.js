var template = require('../../templates/content-artists.html');

// TabArtistsView
module.exports = Backbone.View.extend({
    el: '#tab-content',

    initialize: function() {
        this.$el.html(template());
    }
});
