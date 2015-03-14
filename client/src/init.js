var Initializer = {
    init: function() {
        try {
            this.initBackbone();
            this.initFoundation();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    initBackbone: function() {
        Backbone.$ = $;
    },

    initFoundation: function() {
        Foundation.global.namespace = ''; // disable namespaces as it seems buggy
    }
};

module.exports = Initializer.init();
