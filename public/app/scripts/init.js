// Init foundation
$(document).foundation({
    tab: {
        callback: function(_) {}
    }
});

$(document).ready(function() {
    // Instanciate the ViewModel
    window.mpd.vm = new window.mpd.viewmodel();

    // Search on typing
    window.mpd.vm.searchText.subscribe(function(){
        window.mpd.vm.search();
    });

    // Use of search filters
    window.mpd.vm.searchFilter.subscribe(function(_) {
        window.mpd.vm.search();
    });

    // Apply the bindings
    ko.applyBindings(window.mpd.vm);
});
