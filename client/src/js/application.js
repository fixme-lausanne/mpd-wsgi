jQuery = $ = require('jquery');
_ = require('underscore');
Backbone = require('backbone');

var __foundation = require('foundation');

var __init = require('./init');


// Global events dispatcher
AppDispatch = _.extend({}, Backbone.Events);

// Global configuration
AppConfig = {
    api: 'http://api.mpd.local'
};

// Local storage
var Storage = require('./models/storage');
AppStorage = new Storage();

// Application
var AppView = require('./views/app');
console.log(AppView);
$(function() {
    App = new AppView();
    $(document).foundation();
});
