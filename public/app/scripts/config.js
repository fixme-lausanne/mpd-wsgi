if (window.mpd == undefined) {
    window.mpd = {};
}

window.mpd.config = new function() {
    this.base_url = 'http://localhost:8000';
    this.urlPlaylist = this.base_url + '/playlist';
    this.urlActions = this.base_url + '/action';
    this.urlCover = this.base_url + '/cover';
    this.urlSearch = this.base_url + '/search';
    this.urlFile = this.base_url + '/file';
    this.urlUpdate = this.base_url + '/update';
    this.urlStatus = this.base_url + '/status';

    this.searchLimit = 20;

    this.defaultCover = {
        extralarge: 'images/default_album_xlarge.jpg',
        large: 'images/default_album_large.jpg',
        medium: 'images/default_album_medium.jpg',
        small: 'images/default_album_small.jpg'
    }
};
