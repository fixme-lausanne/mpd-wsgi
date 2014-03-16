// Init foundation
$(document).foundation({
    tab: {
        callback: function(tab) {}
    }
});

$(document).ready(function() {
    // Instanciate the ViewModel
    window.mpd.vm = new window.mpd.viewmodel();

    // Search on change
    window.mpd.vm.searchText.subscribe(function(){
        window.mpd.vm.search();
    });

    window.mpd.vm.searchFilter.subscribe(function(data) {
        window.mpd.vm.search();
    });

    // Apply the bindings
    ko.applyBindings(window.mpd.vm);
});
