/*global require,module*/
var React = require('react');

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
var TabAlbums = React.createClass({
    render: function() {
        var albums = this.props.data.albums.map(function(albm) {
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

module.exports = TabAlbums;
