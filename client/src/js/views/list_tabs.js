var template = require('../../templates/tab-bar.html');

// ListTabsView
module.exports = Backbone.View.extend({
    el: '#tab-bar',

    initialize: function() {
        this.$el.html(template());
    }
});
