var template = require('../../templates/content-genres.html');

// TabGenresView
module.exports = Backbone.View.extend({
    el: '#tab-content',

    initialize: function() {
        this.$el.html(template());
    }
});
