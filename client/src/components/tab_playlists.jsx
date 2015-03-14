/*global require,module*/
var React = require('react'),
    _ = require('lodash');

var Playlist = React.createClass({
    render: function() {
        return (
            <div className="playlist">
              <figure>
                <img src={this.props.image}/>
                <figcaption className="col-md-8">
                  <h6>{this.props.name}</h6>
                </figcaption>
              </figure>
            </div>
        );
    }
});

var RowSong = React.createClass({
    render: function() {
        return (
            <tr>
              <td>{this.props.title}</td>
              <td>{this.props.time}</td>
              <td>{this.props.artist}</td>
              <td>{this.props.album}</td>
              <td>{this.props.genre}</td>
            </tr>
        );
    }
});

var TableSongs = React.createClass({
    render: function() {
        var songs = _.map(this.props.songs, function(song) {
            return (<RowSong title={song.title}
                             time={song.time}
                             artist={song.artist}
                             album={song.album}
                             genre={song.genre}/>);
        });
        return (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Time</th>
                  <th>Artist</th>
                  <th>Album</th>
                  <th>Genre</th>
                </tr>
              </thead>
              <tbody>{songs}</tbody>
            </table>
        );
    }
});

var SelectedPlaylist = React.createClass({
    render: function() {
        var playlist = _.findWhere(this.props.allPlaylists,
                                   {name: this.props.playlist});
        var songs = _.isObject(playlist) ? playlist.songs : [];
        var totalDuration = _.reduce(songs, function(acc, song) {
            return acc + Number.parseInt(song.time, 10);
        }, 0);
        return (
            <section id="list-tracks"
                     className="content-list col-md-9">
              <header className="row">
                <h1>Playing</h1>
                <p>{songs.length} songs, {totalDuration} seconds</p>
              </header>
              <TableSongs songs={songs} />
            </section>
        );
    }
});

var ListPlaylists = React.createClass({
    handleClick: function(name) {
        this.props.onClick(name);
    },

    render: function() {
        var playlists = _.map(this.props.playlists, function(plst) {
            return (
                <li onClick={this.handleClick.bind(this, plst.name)}>
                  <Playlist name={plst.name}
                            image={plst.image}/>
                </li>
            );
        }, this);
        return (
            <section id="list-playlists"
                     className="side-list col-md-3">
              <ul>{playlists}</ul>
            </section>
        );
    }
});

var TabPlaylists = React.createClass({
    getInitialState: function() {
        return {
            selected: 'current'
        };
    },

    handlePlaylistSelection: function(playlistName) {
        this.setState({selected: playlistName});
    },

    render: function() {
        return (
            <div>
              <ListPlaylists playlists={this.props.playlists}
                             onClick={this.handlePlaylistSelection}/>
              <SelectedPlaylist allPlaylists={this.props.playlists}
                                playlist={this.state.selected}/>
            </div>
        );
    }
});

module.exports = TabPlaylists;
