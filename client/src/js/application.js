jQuery = $ = require('jquery');
_ = require('underscore');
Backbone = require('backbone');
React = require('react');

var __foundation = require('foundation');
var __foundation_slider = require('foundation_slider');

var __init = require('./init');

var __utils = require('./utils');


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
$(function() {
    App = new AppView();
    $(document).foundation();
});
