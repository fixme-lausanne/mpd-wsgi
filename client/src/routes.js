var AppRouter = Backbone.Router.extend({
    routes: {
        'albums': 'albums',
        'artists': 'artists',
        'genres': 'genres',
        'playlists': 'playlists',
        'songs': 'songs',

        '*other': 'root'
    },

    root: function() {
        console.log('root');
    },

    albums: function() {
        console.log('albums');
    },

    artists: function() {
        console.log('artists');
    },

    genres: function() {
        console.log('genres');
    },

    playlists: function() {
        console.log('playlists');
    },

    songs: function() {
        console.log('songs');
    }
});

module.exports = new AppRouter();
