/*jshint esnext: true*/
/*global require,module*/
var csp = require('js-csp'),
    request = require('superagent'),
    Config = require('../config.json');

function fetchInitialData() {
    var ch = csp.chan();
    request.get(Config.api + '/initial_data').end(function(error, res) {
        csp.putAsync(ch, {
            error: error,
            data: res.body,
            ok: res.ok
        });
    });
    return ch;
}

module.exports = {
    fetchInitialData: fetchInitialData
};
