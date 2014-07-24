var Track = require('../models/track');

var ListTracks = Backbone.Collection.extend({
    model: Track,
    url: function() {
        return AppConfig.api + '/playlist';
    },

    populate: function(data) {
        return _.map(data, function(elem) {
            return this.add(elem);
        }, this);
    }
});

module.exports = new ListTracks();
