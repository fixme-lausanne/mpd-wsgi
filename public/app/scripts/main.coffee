
# Foundation, callback for tabs
$(document).foundation
  tab:
    callback: (tab) ->
      console.log tab

# KnockoutJS

url = 'http://mpd.fixme.ch/api'
urlCurrent = url + '/current'
urlPlaylist = url + '/playlist'
urlActions = url + '/action'


# Current song
class Song
  constructor: (data) ->
    @title = data.title   || 'unknown title'
    @artist = data.artist || 'unknown artist'
    @album = data.album   || 'unknown album'


# Player actions
class PlayerActions
  previous: ->
    console.log 'previous'
    $.getJSON urlActions + '/previous', (data)

  next: ->
    console.log 'next'
    $.getJSON urlActions + '/next'

  pause: ->
    $.getJSON urlActions + '/pause'

  play: ->
    $.getJSON urlActions + '/play'


# ViewModel
class PlayerViewModel
  constructor: ->
    self = this
    self.current = ko.observable('')
    self.actions = ko.observable(new PlayerActions())
    self.playlist = ko.observableArray([])

    # Current song
    $.getJSON urlCurrent, (data) ->
      self.current(new Song(data))

    # Playlist
    $.getJSON urlPlaylist, (data) ->
      self.playlist $.map(data.songs, (item) ->
        new Song(item))

# Apply the bindings
ko.applyBindings new PlayerViewModel()