/*global require,module*/
var React = require('react');

var Artist = React.createClass({
    render: function() {
        return (
            <div>
              <figure>
                <img width="150" src={this.props.image}/>
                <figcaption>
                  <h6>{this.props.name}</h6>
                </figcaption>
              </figure>
            </div>
        );
    }
});

var Album = React.createClass({
    render: function() {
        return (
            <div className="album" data-cid={this.props.cid}>
              <figure>
                <img width="150" src="/images/all_artists.png" />
                <figcaption>
                  <h5>{this.props.title}</h5>
                  <h6>{this.props.artist}</h6>
                </figcaption>
              </figure>
            </div>
        );
    }
});

var SelectedArtist = React.createClass({
    render: function() {
        var artist = findWhere(this.props.allArtists,
                                 {id: this.props.artist});
        var albums = artist.albums.map(function(albm) {
            return (<li><Album title={albm}/></li>);
        });
        return (
            <section className="content-list col-md-9">
              <header className="row">
                <h1>{artist.name}</h1>
              </header>

              <ul id="list-albums" className="col-md-block-grid-1">
                {albums}
              </ul>
            </section>
        );
    }
});

var ListArtists = React.createClass({
    handleClick: function(id) {
        this.props.onClick(id);
    },

    render: function() {
        var artists = this.props.artists.map(function(artist) {
            return (
                <li onClick={this.handleClick.bind(this, artist.id)}>
                  <Artist image="/images/all_artists.png"
                          name={artist.name}/>
                </li>
            );
        }, this);
        return (
            <section id="list-artists"
                     className="side-list col-md-3">
              <ul>{artists}</ul>
            </section>
        );
    }
});

var TabArtists  = React.createClass({
    getInitialState: function() {
        return {
            artists: [
                {id: 1,
                 name: "Adri\u00e1n Berenguer",
                 albums: [ "La Ballena Azul", "Antimateria" ]},
                {id: 2,
                 name: "American Analog Set",
                 albums: [ "Remixes Compiled" ]},
                {id: 3,
                 name: "AmmonContact",
                 albums: [ "Remixes Compiled" ]},
                {id: 4,
                 name: "Apparat",
                 albums: [ "Remixes Compiled" ]},
                {id: 5,
                 name: "Arena Of Electronic Music",
                 albums: [
                    "Free Electrons vol. 4",
                    "Free Electrons vol.3",
                    "Free Electrons vol.1",
                    "Free Electrons  vol.2"
                 ]},
                {id: 6,
                 name:  "Arietys",
                 albums: [
                    "Humanit\u00e9",
                    "Apocalypsis"
                 ]},
                {id: 7,
                 name: "Brad Sucks",
                 albums: [
                    "Guess Who's a Mess",
                    "I Don't Know What I'm Doing",
                    "Out of It"
                 ]},
                {id: 8,
                 name: "Daft Punk",
                 albums: [
                    "Random Access Memories",
                    "TRON: Legacy R3C0NF1GUR3D"
                 ]}
            ],

            selected: 1
        };
    },

    handleArtistSelection: function(artistId) {
        this.setState({selected: artistId});
    },

    render: function() {
        return (
            <div>
              <ListArtists artists={this.state.artists}
                           onClick={this.handleArtistSelection}/>
              <SelectedArtist allArtists={this.state.artists}
                              artist={this.state.selected}/>
            </div>
        );
    }
});

module.exports = TabArtists;
