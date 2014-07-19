var template = require('../../templates/controls.html');

// ControlsView
module.exports = Backbone.View.extend({
    el: '#controls',

    initialize: function() {
        debugger;
        this.$el.html(template());
    }
});
