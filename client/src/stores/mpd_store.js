var Config = require('../models/config');
var WebSocketDispatcher = require('../dispatcher/websocket_dispatcher');
var EventEmitter = require('events').EventEmitter;

var merge = require('react/lib/merge');

var CHANGE_EVENT = 'controls';

var _songs = {};
var _currentSong = null;
var _status = 'stop'; // 'play', 'pause' or 'stop'

// Helpers
function play() {
    console.debug('helper play');
}

function pause() {
    console.debug('helper pause');
}

function stop() {
    console.debug('helper stop');
    currentSong = null;
}

function playSong(songId) {
    console.debug('helper playSong');
    setCurrentSong(songId);
    play();
}

function setCurrentSong(songId) {
    console.debug('helper setCurrentSong');
    if (songId >= 0) {
        _currentSong = songId;
    } else {
        throw new Error('Invalid songId: ' + songId);
    }
}

// Define Store methods and manage events
var MpdStore = merge(EventEmitter.prototype, {
    getCurrentSong: function() {
        return _currentSong;
    },

    getSongs: function() {
        return _songs;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherIndex: WebSocketDispatcher.register(function(payload) {
        var action = payload.action;

        var actions = {
            'PLAY_SONG': function(action) {
                if (action.songId) {
                    playSong(action.songId);
                }
            },

            'PLAY': function() {
                play();
            },

            'PAUSE': function() {
                pause();
            },

            'STOP': function() {
                stop();
            }
        };

        if (action.actionType &&
            actions[action.actionType]() !== false) {
            return true;
        }
        return false;
    })
});

module.exports = MpdStore;
