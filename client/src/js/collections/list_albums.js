var Album = require('../models/album');

// ListAlbums
module.exports = Backbone.Collection.extend({
    model: Album,
    comparator: 'title',
});
