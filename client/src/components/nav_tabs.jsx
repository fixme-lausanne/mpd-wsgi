/*global require,module*/
var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link;

var NavTabs = React.createClass({
    render: function() {
        return (
            <nav id="list-tabs">
              <ul className="sub-nav">
                <li><Link to="/songs">Songs</Link></li>
                <li><Link to="albums">Albums</Link></li>
                <li><Link to="/artists">Artists</Link></li>
                <li><Link to="/genres">Genres</Link></li>
                <li><Link to="playlists">Playlists</Link></li>
              </ul>
            </nav>
        );
    }
});

module.exports = NavTabs;
