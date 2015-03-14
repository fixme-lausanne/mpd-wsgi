/*global require,module*/
var React = require('react');

var NavTabs = React.createClass({
    render: function() {
        return (
            <nav id="list-tabs">
              <dl className="sub-nav">
                <dt></dt>
                <dd><a href="/#/songs">Songs</a></dd>
                <dd><a href="/#/albums">Albums</a></dd>
                <dd><a href="/#/artists">{this.props.name}</a></dd>
                <dd><a href="/#/genres">Genres</a></dd>
                <dd><a href="/#/playlists">Playlists</a></dd>
              </dl>
            </nav>
        );
    }
});

module.exports = NavTabs;
