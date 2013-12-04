
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


# ViewModel
class PlayerViewModel
  constructor: ->
    self = this
    self.current = ko.observable('')
    self.actions = ko.observable(new PlayerActions())

    $.getJSON urlCurrent, (data) ->
      self.current(new Song(data))


# Apply the bindings
ko.applyBindings new PlayerViewModel()