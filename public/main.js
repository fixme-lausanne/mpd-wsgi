function onLoad() {
    refreshCurrentSong();
}

var SONG_URL = "https://mpd.fixme.ch/api/current";

function refreshCurrentSong() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", SONG_URL, true);

    xhr.onreadystatechange = function() {
      if ( xhr.readyState === 4) {
        if (xhr.status === 200) {
            try {
                var parsed_text = jsonParse(xhr.responseText);
                var isOpen = parsed_text.open;
                var title = parsed_text.title;
                var artist = parsed_text.artist;
                var track = parsed_text.file;
                var info;
                if (track !== "undefined" && artist !== "undefined") {
                    info = title + " by " + artist;
                } else {
                    info = file;
                }
            } catch (err) {
                //json parsing failed or doesn't contain the correct element
                console.log(err);
                return;
            }
            var actualBlock = document.getElementById("actual-song");
            actualBlock.textContent = info;
        }
        }
    };
    xhr.send(null);
}

function changeSong(url) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            refreshCurrentSong();
        }
    };
    xhr.send(null);
}

function play() {
    var PLAY_SONG_URL = "api/action/play";
    changeSong(PLAY_SONG_URL);
}

function nextSong() {
    var NEXT_SONG_URL = "api/action/next";
    changeSong(NEXT_SONG_URL);
}

function previousSong() {
    var PREVIOUS_SONG_URL = "api/action/previous";
    changeSong(PREVIOUS_SONG_URL);
}

function updateLibrary() {
    var UPDATE_URL = "api/update";
    changeSong(UPDATE_URL);
}
