/*global require,module*/
var React = require('react');

var InfoCurrentSong = React.createClass({
    render: function() {
        return (
            <div id="info-current" className="col-sm-8">
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
            <div id="cover-current" className="col-sm-2">
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
            <div id="playlist-current" className="col-sm-2">
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
              <div className="buttons-controls col-sm-3">
                <i className="fa fa-backward"></i>
                <i className="fa fa-play"></i>
                <i className="fa fa-forward"></i>
              </div>

              <div id="volume-control" className="col-sm-2">
                <div className="range-slider round" data-slider>
                  <span className="range-slider-handle round"></span>
                  <span className="range-slider-active-segment round"></span>
                  <input type="hidden" />
                </div>
              </div>

              <div id="info-panel" className="col-sm-4">
                <div className="row">
                  <AlbumCurrentSong />
                  <InfoCurrentSong />
                  <CurrentPlaylist />
                </div>
              </div>

              <input id="search" className="col-sm-2" placeholder="Search Library" />
            </div>
        );
    }
});

module.exports = Controls;
