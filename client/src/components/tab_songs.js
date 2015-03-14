var template = require('../../templates/content-songs.html');

// TabSongsView
module.exports = Backbone.View.extend({
    el: '#tab-content',

    initialize: function() {
        this.$el.html(template());
    }
});
