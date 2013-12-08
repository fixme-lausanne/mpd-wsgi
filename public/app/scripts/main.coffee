# Foundation, callback for tabs
$(document).foundation
  tab:
    callback: (tab) ->


# KnockoutJS

base_url = 'http://mpd.fixme.ch/api'
urlCurrent = base_url + '/current'
urlPlaylist = base_url + '/playlist'
urlActions = base_url + '/action'
urlCover = base_url + '/cover'
urlSearch = base_url + '/search'
urlFile = base_url + '/file'
urlUpdate = base_url + '/update'


searchLimit = 20 # Maximal number of songs the search will return


errorCover =
  extralarge: 'images/error_album_xlarge.jpg'
  large: 'images/error_album_large.jpg'
  medium: 'images/error_album_medium.jpg'
  small: 'images/error_album_small.jpg'

defaultCover =
  extralarge: 'images/default_album_xlarge.jpg'
  large: 'images/default_album_large.jpg'
  medium: 'images/default_album_medium.jpg'
  small: 'images/default_album_small.jpg'


# Handle functions
logFailure = (args, data) ->
  console.log "#{args.callee.toString()} has failed"
  console.log data

# Current song
class Song
  constructor: (data) ->
    @title = data.title   || 'unknown title'
    @artist = data.artist || 'unknown artist'
    @album = data.album   || 'unknown album'

# Player actions
class PlayerActions
  previous: ->
    @_send()

  next: ->
    @_send()

  pause: ->
    @_send()

  play: ->
    @_send()

  update: ->
    $.getJSON urlUpdate


  # private
  _send: (url = "") ->
    caller = arguments.callee.caller.name
    url = url || "#{urlActions}/#{caller}"

    $.getJSON(url)
    .fail (data) ->
        logFailure(caller, data)


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

    self.getCurrent()
    self.getPlaylist()
    self.getCover()

  # Current song
  getCurrent: ->
    $.getJSON urlCurrent, (data) ->
      self.current new Song(data)
    .fail (data) ->
        logFailure arguments, data
        badSong = {title: 'Title: Error', artist: 'Artist: Error', album: 'Album: Error'}
        self.current badSong

  # Playlist
  getPlaylist: ->
    $.getJSON urlPlaylist, (data) ->
      self.playlist $.map(data.songs, (item) ->
        new Song(item))
    .fail (data) ->
        logFailure arguments, data
        self.playlist [
          {error: 'Playlist: Error'}
        ]

  # Covers
  getCover: ->
    $.getJSON urlCover, (data) ->
      self.covers data ? defaultCover
    .fail (data) ->
        logFailure arguments, data
        self.covers errorCover


# Instanciate the ViewModel
viewModel = new PlayerViewModel()

# Search
viewModel.searchText.subscribe (newValue) ->
  filter = $('input[name=filters]:checked').val()
  if newValue.length > 3
    $.getJSON urlSearch + "?#{filter}=#{newValue}&limit=#{searchLimit}", (searchData) ->
      viewModel.searchResult $.map(searchData.songs, (item) ->
        new Song(item))
  else
    viewModel.searchResult []

# Apply the bindings
ko.applyBindings viewModel