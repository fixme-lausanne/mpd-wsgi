var Album = React.createClass({
    render: function() {
        return (
            <div className="album" data-cid={this.props.cid}>
              <figure>
                <img width="150" src="/images/all_artists.png" />
                <figcaption>
                  <h5>{this.props.title}</h5>
                  <h6>{this.props.artist}</h6>
                </figcaption>
              </figure>
            </div>
        );
    }
});

// TabAlbums
module.exports = React.createClass({
    getInitialState: function() {
        return {
            albums: [
                {title: 'Autumn prelude', artist: 'Zero-project'},
                {title: 'Camellia no Hitomi', artist: 'Nakano Aiko'},
                {title: 'Autumn prelude', artist: 'Zero-project'},
                {title: 'Camellia no Hitomi', artist: 'Nakano Aiko'},
                {title: 'Autumn prelude', artist: 'Zero-project'},
                {title: 'Camellia no Hitomi', artist: 'Nakano Aiko'},
                {title: 'Autumn prelude', artist: 'Zero-project'},
                {title: 'Camellia no Hitomi', artist: 'Nakano Aiko'},
                {title: 'Autumn prelude', artist: 'Zero-project'},
                {title: 'Camellia no Hitomi', artist: 'Nakano Aiko'},
                {title: 'Autumn prelude', artist: 'Zero-project'},
                {title: 'Camellia no Hitomi', artist: 'Nakano Aiko'}
            ]
        };
    },

    render: function() {
        var albums = _.map(this.state.albums, function(albm) {
            return (
                <li>
                  <Album cid={albm.cid}
                         title={albm.title}
                         artist={albm.artist}/>
                </li>
            );
        });
        return (
            <ul id="list-albums"
                className="content-list medium-block-grid-5">
              {albums}
            </ul>
        );
    }
});
