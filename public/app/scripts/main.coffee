
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
urlCover = url + '/cover'
urlSearch = url + '/search'
urlFile = url + '/file'
urlUpdate = url + '/update'

searchLimit = 20 # Maximal number of songs the search will return

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

  update: ->
    $.getJSON urlUpdate


# ViewModel
class PlayerViewModel
  constructor: ->
    self = this
    self.current = ko.observable('')
    self.actions = ko.observable(new PlayerActions())
    self.playlist = ko.observableArray([])
    self.covers = ko.observable('')
    self.searchText = ko.observable('')
    self.searchResult = ko.observableArray []
    self.fileUrl = ko.observable(urlFile)


    # Current song
    $.getJSON urlCurrent, (data) ->
      self.current(new Song(data))

    # Playlist
    $.getJSON urlPlaylist, (data) ->
      self.playlist $.map(data.songs, (item) ->
        new Song(item))

    # Covers
    $.getJSON urlCover, (data) ->
      self.covers(data)

# Instanciate the ViewModel
viewModel = new PlayerViewModel()

# Search
viewModel.searchText.subscribe (newValue) ->
  filter = $('input[name=filters]:checked').val()
  if newValue.length > 3
    console.log newValue
    $.getJSON urlSearch + "?#{filter}=#{newValue}&limit=#{searchLimit}", (searchData) ->
      console.log searchData
      viewModel.searchResult $.map(searchData.songs, (item) ->
        new Song(item))
  else
    viewModel.searchResult []

# Apply the bindings
ko.applyBindings viewModel