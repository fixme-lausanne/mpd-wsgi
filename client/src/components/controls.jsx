/*global require,module*/
var React = require('react');

var InfoCurrentSong = React.createClass({
    render: function() {
        return (
            <div id="info-current" className="columns small-8">
              <h5 className="row">Betrayal Takes Two</h5>
              <p className="row">Richard hell and the voidods - Blank generation</p>
              <Seekbar />
            </div>

        );
    }
});

var AlbumCurrentSong = React.createClass({
    render: function() {
        return (
            <div id="cover-current" className="columns small-2">
              <img src="/images/all_artists.png" />
            </div>
        );
    }
});

var Seekbar = React.createClass({
    render: function() {
        return (
            <div id="seekbar-current" className="row range-slider round" data-slider>
              <span className="range-slider-handle round"></span>
              <span className="range-slider-active-segment round"></span>
              <input type="hidden" />
            </div>
        );
    }
});

var CurrentPlaylist = React.createClass({
    render: function() {
        return (
            <div id="playlist-current" className="columns small-2">
              <i className="fa fa-list"></i>
            </div>
        );
    }
});

// Controls
var Controls = React.createClass({
    render: function() {
        return (
            <div id="controls" className="row">
              <div className="buttons-controls columns small-3">
                <i className="fa fa-backward"></i>
                <i className="fa fa-play"></i>
                <i className="fa fa-forward"></i>
              </div>

              <div id="volume-control" className="columns small-2">
                <div className="range-slider round" data-slider>
                  <span className="range-slider-handle round"></span>
                  <span className="range-slider-active-segment round"></span>
                  <input type="hidden" />
                </div>
              </div>

              <div id="info-panel" className="columns small-4">
                <div className="row">
                  <AlbumCurrentSong />
                  <InfoCurrentSong />
                  <CurrentPlaylist />
                </div>
              </div>

              <input id="search" className="columns small-2" placeholder="Search Library" />
            </div>
        );
    }
});

module.exports = Controls;
