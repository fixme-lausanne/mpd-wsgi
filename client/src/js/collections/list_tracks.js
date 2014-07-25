var Track = require('../models/track');

// ListTracks
module.exports = Backbone.Collection.extend({
    model: Track,
    url: function() {
        return AppConfig.api + '/playlist';
    }
});
