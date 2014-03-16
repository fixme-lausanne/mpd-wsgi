if (window.mpd == undefined) {
    window.mpd = {};
}

window.mpd.player = new function() {
    var config = window.mpd.config;

    // Manage actions
    var _sendPlayerAction = function(action, url) {
        var url = url || config.urlActions + '/' + action;

        $.ajax({
            url: url,
            context: {action: action,
                      url: url}
        }).done(function(data){
            window.mpd.vm.loadUi();
        }).fail(function(xhr, status, err){
            window.mpd.utils.logErrors(action, {
                xhr: xhr, status: status, error: err,
                url: this.url, action: this.action
            });
        });
    };

    this.actions = function() {
        this.previous = function() {
            _send('previous');
        };

        this.next = function() {
            _send('next');
        };

        this.pause = function() {
            _send('pause');
        };

        this.play = function() {
            _send('play');
        };

        this.update = function() {
            _send('update', config.urlUpdate);
        };
    };
}
