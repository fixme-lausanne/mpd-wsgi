jQuery = $ = require('jquery');
_ = require('underscore');
Backbone = require('backbone');

var __foundation = require('foundation');

var __init = require('./init');


// Global events dispatcher
AppDispatch = _.extend({}, Backbone.Events);

// Application
var AppView = require('./views/app');
console.log(AppView);
$(function() {
    App = new AppView();
})
