jQuery = $ = require('jquery');
_ = require('underscore');
Backbone = require('backbone');
React = require('react');

var __foundation = require('foundation');
var __foundation_slider = require('foundation_slider');

var __init = require('./init');
var __utils = require('./utils');

var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App = require('./views/app.jsx');
var TabAlbums = require('./views/tab_albums');
var TabArtists = require('./views/tab_artists');
var TabPlaylists = require('./views/tab_playlists');

var AppRoutes = (
    <Routes location="hash">
      <Route path="/" handler={App}>
        <Route name="albums" handler={TabAlbums} />
        <Route name="playlists" handler={TabPlaylists} />
        <DefaultRoute handler={TabAlbums} />
        <NotFoundRoute handler={TabAlbums} />
      </Route>
    </Routes>
);

React.renderComponent(AppRoutes,
                      document.getElementsByTagName('body')[0]);
