
# Foundation, callback for tabs
$(document).foundation
  tab:
    callback: (tab) ->
      console.log tab

# KnockoutJS

url = 'http://mpd.fixme.ch/api'
urlCurrent = url + '/current'


# Current song
class Song
  constructor: (data) ->
    console.log data
    @title = data.title   || 'unkown title'
    @artist = data.artist || 'unknown artist'
    @album = data.album   || 'unknown album'

class CurrentSongViewModel
  constructor: ->
    self = this
    self.current = ko.observable('')

    $.getJSON urlCurrent, (data) ->
      self.current(new Song(data))

ko.applyBindings new CurrentSongViewModel(), document.getElementById('current-track')



# Player actions
class PlayerActions
  previous: ->
    console.log 'previous'
    $.getJSON url + '/action/previous', (data) ->
      console.log data

  next: ->
    console.log 'next'
    $.getJSON url + '/action/next', (data) ->
      console.log data

  pause: ->
    $.getJSON(url + '/action/pause')

  play: ->
    $.getJSON(url + '/action/play')

class PlayerActionsViewModel
  constructor: ->
    self = this
    self.actions = ko.observable(new PlayerActions())
    console.log self.actions


ko.applyBindings new PlayerActionsViewModel(), document.getElementById('player-actions')