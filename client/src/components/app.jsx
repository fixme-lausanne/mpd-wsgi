/*jshint esnext: true*/
/*global require,module*/
var React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    csp = require('js-csp'),
    request = require('superagent'),

    Controls = require('./controls.jsx'),
    NavTabs = require('./nav_tabs.jsx');

var Header = React.createClass({
    render: function() {
        return (
            <header>
              {/* Controls: backward, play, forward, search, etc. */}
              <Controls />
              {/* List of tabs: songs, albums, artist, etc. */}
              <NavTabs />
            </header>
        );
    }
});

// App
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
                    <NavTabs />
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

                <footer></footer>
            </div>
        );
    }
});

module.exports = App;
