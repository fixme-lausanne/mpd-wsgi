var template = require('../../templates/content-albums.html');

// TabAlbumsView
module.exports = Backbone.View.extend({
    el: '#tab-content',

    initialize: function() {
        this.$el.html(template());
    }
});
