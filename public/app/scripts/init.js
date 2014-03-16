// Init foundation
$(document).foundation({
    tab: {
        callback: function(tab) {}
    }
});

$(document).ready(function() {
    // Instanciate the ViewModel
    var viewModel = new window.mpd.viewmodel();
    window.mpd.vm = viewModel;

    // Search on change
    viewModel.searchText.subscribe(function(){
        window.mpd.vm.search();
    });

    viewModel.searchFilter.subscribe(function(data) {
        window.mpd.vm.search();
    });

    // Apply the bindings
    ko.applyBindings(viewModel);
});
