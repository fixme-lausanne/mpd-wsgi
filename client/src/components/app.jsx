/*jshint esnext: true*/
/*global require,module*/
var React = require('react'),
    Router = require('react-router'),
    csp = require('js-csp'),
    request = require('superagent'),

    Link = Router.Link,
    RouteHandler = Router.RouteHandler,

    Controls = require('./controls.jsx');

var App = React.createClass({
    statics: {
        fetchInitialData: function(api, params) {
            return csp.go(function*() {
                return (yield api.queryInitialData());
            });
        }
    },

    getInitialState: function() {
        return this.props.initialData.appRoot;
    },

    render: function() {
        return (
            <div>
                <header>
                    {/* Controls: backward, play, forward, search, etc. */}
                    <Controls />
                    {/* List of tabs: songs, albums, artist, etc. */}
                    <nav id="list-tabs">
                        <ul className="sub-nav">
                            <li><Link to="/songs">Songs</Link></li>
                            <li><Link to="albums">Albums</Link></li>
                            <li><Link to="artists">Artists</Link></li>
                            <li><Link to="/genres">Genres</Link></li>
                            <li><Link to="playlists">Playlists</Link></li>
                        </ul>
                    </nav>
                </header>

                <main id="tab-content" className="row">
                    <RouteHandler currentPlaylist={this.state.currentPlaylist}
                                  currentSong={this.state.currentSong}
                                  playlists={this.state.playlists}
                                  songs={this.state.songs}
                                  albums={this.state.albums}
                                  artists={this.state.albums}
                                  status={this.state.status}/>
                </main>
            </div>
        );
    }
});

module.exports = App;
