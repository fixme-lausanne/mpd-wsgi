var AppRouter = Backbone.Router.extend({
    routes: {
        'albums': 'albums',
        'songs': 'songs',

        '*other': 'root'
    },

    root: function() {
        console.log('root');
    },

    albums: function() {
        console.log('albums');
    },

    songs: function() {
        console.log('songs');
    }
});

module.exports = new AppRouter();
