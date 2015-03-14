/*global require,module*/
var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    NotFoundRoute = Router.NotFoundRoute,

    App = require('./components/app.jsx'),
    TabAlbums = require('./components/tab_albums.jsx'),
    TabArtists = require('./components/tab_artists.jsx'),
    TabPlaylists = require('./components/tab_playlists.jsx');

var routes = (
    <Route location="hash">
      <Route path="/" handler={App}>
        <Route name="albums" handler={TabAlbums} />
        <Route name="playlists" handler={TabPlaylists} />
        <DefaultRoute handler={TabAlbums} />
        <NotFoundRoute handler={TabAlbums} />
      </Route>
    </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
    React.renderComponent(
        <Handler/>,
        document.getElementById('react-root')
    );
});
