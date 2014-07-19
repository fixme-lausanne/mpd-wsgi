var ControlsView = require('../views/controls');
var ListTabsView = require('../views/list_tabs');

var TabAlbumsView = require('../views/tab_albums');

// AppView
module.exports = Backbone.View.extend({
    el: 'body',

    initialize: function() {
        this.controlsView = new ControlsView();
        this.tabbarView = new ListTabsView();

        this.currentView = new TabAlbumsView();

        $(document).foundation();
    }
});
