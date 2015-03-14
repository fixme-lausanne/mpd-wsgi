// Dispatcher
module.exports = Backbone.Model.extend({
    initialize: function() {
        this.eventsSocket = new WebSocket(AppConfig.ws + '/events');
        this.eventsSocket.onmessage = this.onMessage;
        this.eventsSocket.onerror = this.onError;
        this.eventsSocket.onopen = this.onOpen;
        this.eventsSocket.onclose = this.onClose;

        this.on('change:player', function(event) {
            $.when(this.actions.send('current'))
                .done(function(data) {
                    AppDispatch.trigger('change:current', data);
                }).fail(function(xhr, err, status) {
                    console.error(xhr, err, status);
                });
        }, this);
    },

    // Events
    changePlayer: function() {
        $.when(this.actions.send('current')).done(function(data) {
            AppDispatch.trigger('change:current');
        });
    },


    // Websocket
    onMessage: function(event) {
        console.log(event.data);
        _.each(JSON.parse(event.data).result, function(item) {
            AppDispatch.trigger('change:' + item);
        });
    },

    onError: function(event) {
        console.error(event);
        console.error(event.data);
    },

    onOpen: function(event) {
        console.debug(event);
    },

    onClose: function(event) {
        console.debug(event);
    },


    // Player / playlist actions
    actions: {
        backward: function() {
            this.send('action/previous');
        },

        forward: function() {
            this.send('action/next');
        },

        play: function() {
            this.send('action/play');
        },

        pause: function() {
            this.send('action/pause');
        },

        playlistClear: function() {
            this.send('playlist', 'DELETE');
        },

        send: function(target, requestType, callbackDone) {
            requestType = requestType || 'GET';
            callbackDone = callbackDone || function() { };

            console.log('send action:');
            console.log(target, requestType, callbackDone);

            return $.ajax({
                url: AppConfig.api + '/' + target,
                type: requestType,
                context: this
            }).fail(function(xhr, err, status) {
                console.error(xhr, err, status);
            }).done(callbackDone);
        }
    }
});
