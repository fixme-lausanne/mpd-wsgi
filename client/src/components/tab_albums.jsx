/*global require,module*/
var React = require('react'),
    _ = require('lodash');

var Album = React.createClass({
    render: function() {
        var songs = _.chain(this.props.songs)
                .sortBy('track')
                .map(function(song) {
                    return (<li><span>{song.track}</span>{song.title}</li>);
                })
                .value();
        return (
            <div className="album">
              <figure>
                <img width="150" src="/images/all_artists.png" />
                <figcaption>
                  <h5>{this.props.title}</h5>
                <ol>
                {songs}
                </ol>
                </figcaption>
              </figure>
            </div>
        );
    }
});

var TabAlbums = React.createClass({
    render: function() {
        var albums = Object.keys(this.props.albums).map(function(albumTitle) {
            var songs = this.props.albums[albumTitle];
            return (
                <li>
                    <Album songs={songs}
                title={albumTitle}/>
                </li>
            );
        }, this);
        return (
            <ul id="list-albums"
                className="content-list medium-block-grid-5">
              {albums}
            </ul>
        );
    }
});

module.exports = TabAlbums;
