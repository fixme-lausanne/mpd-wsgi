var TrackView = require('../views/track');

// ListTracksView
module.exports = Backbone.View.extend({
    el: '#list-tracks',

    initialize: function() {
        this.listenTo(AppStorage.get('playlists'),
                      'change:selected', this.render);

        this.$theader = this.$('theader');
        this.$tbody = this.$('tbody');
    },

    render: function() {
        this.$tbody.empty();
        this.$tbody.append(this.renderAll());
        return this;
    },

    renderOne: function(dataTrack) {
        var view = new TrackView({model: dataTrack});
        return view.render().$el;
    },

    renderAll: function() {
        var playlist = AppStorage.get('playlists')
            .findWhere({selected: true});

        if (playlist && playlist.has('songs')) {
            return playlist.get('songs').map(this.renderOne, this);
        }
    }
});
