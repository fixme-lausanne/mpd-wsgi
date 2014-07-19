var template = require('../../templates/controls.html');

// ControlsView
module.exports = Backbone.View.extend({
    el: '#controls',

    initialize: function() {
        this.$el.html(template());
    }
});
