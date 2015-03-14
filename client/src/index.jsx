/*global require,module*/
var React = require('react'),
    Router = require('react-router'),

    App = require('./components/app.jsx'),
    TabAlbums = require('./components/tab_albums.jsx'),
    TabArtists = require('./components/tab_artists.jsx'),
    TabPlaylists = require('./components/tab_playlists.jsx');

var routes = (
    <Routes location="hash">
      <Route path="/" handler={App}>
        <Route name="albums" handler={TabAlbums} />
        <Route name="playlists" handler={TabPlaylists} />
        <DefaultRoute handler={TabAlbums} />
        <NotFoundRoute handler={TabAlbums} />
      </Route>
    </Routes>
);

React.renderComponent(
    routes,
    document.getElementsById('react-root')
);
