/*global require,module*/
var React = require('react'),
    _ = require('lodash');

var Artist = React.createClass({
    render: function() {
        return (
            <div>
              <figure>
                <img width="150" src="/images/all_artists.png"/>
                <figcaption>
                  <h6>{this.props.name}</h6>
                </figcaption>
              </figure>
            </div>
        );
    }
});

var TabArtists  = React.createClass({
    handleArtistSelection: function(artistId) {
        this.setState({selected: artistId});
    },

    render: function() {
        var artists = Object.keys(this.props.artists).map(function(artistName) {
            var songs = this.props.artists[artistName];
            return (
                <li><Artist songs={songs} name={artistName}/></li>
            );
        }, this);
        return (
            <ul>{artists}</ul>
        );
    }
});

module.exports = TabArtists;
