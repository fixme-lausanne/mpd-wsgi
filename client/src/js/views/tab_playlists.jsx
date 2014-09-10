var Playlist = React.createClass({
    render: function() {
        return (
            <div className="playlist">
              <figure>
                <img src={this.props.image}/>
                <figcaption className="columns medium-8">
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
                             genre={song.genre}/>)
        });
        return (
            <table>
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
                                   {id: this.props.playlist});
        var totalDuration = _.reduce(playlist.songs, function(acc, song) {
            return acc + Number.parseInt(song.time, 10);
        }, 0);
        return (
            <section id="list-tracks"
                     className="content-list columns medium-9">
              <header class="row">
                <h1>Playing</h1>
                <p>{playlist.songs.length} songs, {totalDuration} seconds</p>
              </header>
              <TableSongs songs={playlist.songs} />
            </section>
        );
    }
});

var ListPlaylists = React.createClass({
    handleClick: function(id) {
        this.props.onClick(id);
    },

    render: function() {
        var playlists = _.map(this.props.playlists, function(plst) {
            return (
                <li onClick={this.handleClick.bind(this, plst.id)}>
                  <Playlist name={plst.name}
                            image={plst.image}/>
                </li>
            );
        }, this);
        return (
            <section id="list-playlists"
                     className="side-list columns medium-3">
              <ul>{playlists}</ul>
            </section>
        );
    }
});

// TabPlaylists
module.exports = React.createClass({
    getInitialState: function() {
        return {
            playlists: [
                {
                    "id": 1,
                    "last-modified": "2014-08-04T11:17:21Z",
                    "name": "FUCKYOU_AMERICA",
                    "songs": [
                        {
                            "album": "Antimateria",
                            "artist": "Adri\u00e1n Berenguer",
                            "file": "Adrian Berenguer (copy)/Antimateria/01 - Adrin Berenguer - Ilvatar.mp3",
                            "genre": "(255)",
                            "last-modified": "2013-08-25T18:43:23Z",
                            "time": "179",
                            "title": "Il\u00favatar",
                            "track": "01"
                        },
                        {
                            "album": "Shakerism",
                            "artist": "Heymoonshaker",
                            "date": "2013",
                            "file": "Heymoonshaker - Shakerism 2013/02 - Wallet Switcher.flac",
                            "genre": "Beatbox blues",
                            "last-modified": "2013-11-15T06:41:16Z",
                            "time": "269",
                            "title": "Wallet Switcher",
                            "track": "2"
                        },
                        {
                            "album": "Shakerism",
                            "artist": "Heymoonshaker",
                            "date": "2013",
                            "file": "Heymoonshaker - Shakerism 2013/03 - Part 1.flac",
                            "genre": "Beatbox blues",
                            "last-modified": "2013-11-15T06:39:29Z",
                            "time": "128",
                            "title": "Part 1",
                            "track": "3"
                        }
                    ]
                },
                {
                    "id": 2,
                    "last-modified": "2014-08-04T11:17:21Z",
                    "name": "Wonderful playlist name",
                    "songs": [
                        {
                            "album": "NOPNOP album",
                            "artist": "Yada yada artist",
                            "file": "Adrian Berenguer (copy)/Antimateria/01 - Adrin Berenguer - Ilvatar.mp3",
                            "genre": "(255)",
                            "last-modified": "2013-08-25T18:43:23Z",
                            "time": "179",
                            "title": "ROFLOFLO title",
                            "track": "01"
                        },
                        {
                            "album": "OTHER NOPNOP album",
                            "artist": "Other NADA YADA artist",
                            "file": "Adrian Berenguer (copy)/Antimateria/01 - Adrin Berenguer - Ilvatar.mp3",
                            "genre": "(255)",
                            "last-modified": "2013-08-25T18:43:23Z",
                            "time": "367",
                            "title": "HELLO NOP YALALALA title",
                            "track": "02"
                        }
                    ]
                }
            ],

            selected: 1
        };
    },

    handlePlaylistSelection: function(playlistId) {
        this.setState({selected: playlistId});
    },

    render: function() {
        return (
            <div>
              <ListPlaylists playlists={this.state.playlists}
                             onClick={this.handlePlaylistSelection}/>
              <SelectedPlaylist allPlaylists={this.state.playlists}
                                playlist={this.state.selected}/>
            </div>
        );
    }
});
