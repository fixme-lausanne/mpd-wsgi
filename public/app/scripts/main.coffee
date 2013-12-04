
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

ko.applyBindings new CurrentSongViewModel()
