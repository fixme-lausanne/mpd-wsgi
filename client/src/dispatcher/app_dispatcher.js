var Dispatcher = require('flux').Dispatcher;
var copyProperties = require('react/lib/copyProperties');

// AppDispatcher
module.exports = copyProperties(new Dispatcher(), {
    handleServerAction: function(action) {
        var payload = {
            source: PayloadSources.SERVER_ACTION,
            action: action
        };
        this.dispatch(payload);
    },

    handleViewAction: function(action) {
        var payload = {
            source: PayloadSources.VIEW_ACTION,
            action: action
        };
        this.dispatch(payload);
    }
});
