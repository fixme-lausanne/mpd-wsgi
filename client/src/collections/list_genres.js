var Genre = require('../models/genre');

// ListGenres
module.exports = Backbone.Collection.extend({
    model: Genre,
    comparator: 'title',
});
