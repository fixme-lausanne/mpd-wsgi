/*global require,module*/
var React = require('react'),
    Storage = require('../models/storage'),
    Config = require('../models/config'),
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
module.exports = React.createClass({
    getInitialState: function() {
        return {
            data: Storage.defaultState
        };
    },

    componentWillMount: function() {
        $.when(this.fechDataOnLoad())
            .done(_.bind(this.handleLoadSuccess, this))
            .fail(_.bind(this.handleLoadFailure, this));
    },

    componentDidMount: function() {
        $(document).foundation();
    },

    fechDataOnLoad: function() {
        return $.ajax({
            type: 'GET',
            url: Config.api + '/initial_data'
        });
    },

    handleLoadSuccess: function(data) {
        this.setState({data: Storage.populate(data)});
    },

    handleLoadFailure: function(xhr, err, status) {
        console.error(xhr, err, status);
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
                <this.props.activeRouteHandler data={this.state.data} />
              </main>

              <footer></footer>
            </div>
        );
    }
});
