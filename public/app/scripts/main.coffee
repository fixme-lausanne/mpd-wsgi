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
urlStatus = base_url + '/status'


searchLimit = 20 # Maximal number of songs the search will return


defaultCover =
  extralarge: 'images/default_album_xlarge.jpg'
  large: 'images/default_album_large.jpg'
  medium: 'images/default_album_medium.jpg'
  small: 'images/default_album_small.jpg'


# Handle functions
logFailure = (callerName, data) ->
  console.error "#{callerName} has failed"
  console.error data


# Current song
class Song
  constructor: (data) ->
    @title = data.title   || 'unknown title'
    @artist = data.artist || 'unknown artist'
    @album = data.album   || 'unknown album'

# Player actions
class PlayerActions
  @previous: ->
    PlayerActions._send('previous')

  @next: ->
    PlayerActions._send('next')

  @pause: ->
    PlayerActions._send('pause')

  @play: ->
    PlayerActions._send('play')

  @update: ->
    PlayerActions._send('update', urlUpdate)


  # private
  @_send: (caller, url = null) ->
#    caller = fnName arguments.callee.caller
    url = url || "#{urlActions}/#{caller}"

    $.getJSON(url)
    .done (data) ->
        viewModel.getStatus()
    .fail (data) ->
        logFailure(caller, data)


class PlaylistActions
  @add: (filename) ->
    PlaylistActions._send('PUT', filename)

  @clear: ->
    PlaylistActions._send('DELETE')

  @_send: (type, data = null) ->
    url = "#{urlPlaylist}"

    $.ajax({url: url, type: type, data: data})
    .done (data) ->
        viewModel.getCurrent()
        viewModel.getPlaylist()
    .fail (data) ->
        logFailure('PlaylistActions._send', data)


# ViewModel
class PlayerViewModel
  constructor: ->
    self = this
    self.current = ko.observable ''
    self.playerActions = PlayerActions
    self.playlistActions = PlaylistActions
    self.playlist = ko.observableArray []
    self.covers = ko.observable ''
    self.searchText = ko.observable ''
    self.searchFilter = ko.observable 'any'
    self.searchResult = ko.observableArray []
    self.fileUrl = ko.observable urlFile
    self.status = ko.observable {state: 'stop'}

    self.getCurrent()
    self.getPlaylist()
    self.getCover()
    self.getStatus()

  # Current song
  getCurrent: =>
    $.getJSON urlCurrent, (data) =>
      @current new Song(data)
    .fail (data) =>
        logFailure 'getCurent', data
        badSong = {title: 'Title: Error', artist: 'Artist: Error', album: 'Album: Error'}
        @current badSong

  # Playlist
  getPlaylist: =>
    $.getJSON urlPlaylist, (data) =>
      @playlist $.map(data.songs, (item) ->
        new Song(item))
    .fail (data) =>
        logFailure 'getPlaylist', data
        @playlist {error: 'Playlist: Error'}

  # Covers
  getCover: =>
    $.getJSON urlCover, (data) =>
      @covers data ? defaultCover
    .fail (data) =>
        logFailure 'getCover', data
        @covers defaultCover

  # Status
  getStatus: =>
    $.getJSON urlStatus, (data) =>
      @status data
    .fail (data) =>
        logFailure 'getStatus', data
        @status {state: 'stop'}

  # Status
  getStatus: =>
    $.getJSON urlStatus, (data) =>
      @status data
    .fail (data) =>
        logFailure 'getStatus', data
        @status {state: 'stop'}

  # Search
  search: =>
    searchString = @searchText()
    filter = @searchFilter()

    if searchString.length > 3
      url = "#{urlSearch}?#{filter}=#{searchString}&limit=#{searchLimit}"
      $.getJSON url, (searchData) =>
        @searchResult $.map(searchData.results, (item) ->
          new Song(item))
      .fail (data) =>
          logFailure 'search', data
          @searchResult {error: 'Search: Error'}
    else
      @searchResult []

# Instanciate the ViewModel
viewModel = new PlayerViewModel()

# Search on change
viewModel.searchText.subscribe (newValue) =>
  viewModel.search()

viewModel.searchFilter.subscribe (newValue) =>
  viewModel.search()

# Apply the bindings
ko.applyBindings viewModel