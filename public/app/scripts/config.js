if (window.mpd === undefined) {
    window.mpd = {};
}

window.mpd.config = new function() {
    this.baseUrl = '/api';
    this.urlCurrent = this.baseUrl + '/current';
    this.urlPlaylist = this.baseUrl + '/playlist';
    this.urlActions = this.baseUrl + '/action';
    this.urlCover = this.baseUrl + '/cover';
    this.urlSearch = this.baseUrl + '/search';
    this.urlFile = this.baseUrl + '/file';
    this.urlUpdate = this.baseUrl + '/update';
    this.urlStatus = this.baseUrl + '/status';

    this.searchLimit = 20;

    this.defaultCover = {
        extralarge: 'images/default_album_xlarge.jpg',
        large: 'images/default_album_large.jpg',
        medium: 'images/default_album_medium.jpg',
        small: 'images/default_album_small.jpg'
    };
};
