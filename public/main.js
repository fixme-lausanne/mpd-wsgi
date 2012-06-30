function onLoad() {
    refreshCurrentSong()
}

var SONG_URL = "http://mpd.fixme.ch/api/current"

function refreshCurrentSong() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", SONG_URL, true);

    xhr.onreadystatechange = function() {
      if ( xhr.readyState == 4) {
        if (xhr.status == 200) {
            try {
                var parsed_text = jsonParse(xhr.responseText);
                var isOpen = parsed_text.open;
                var track = parsed_text.title;
            } catch (err) {
                //json parsing failed or doesn't contain the correct element
                console.log(err);
                return;
            }
            var actualBlock = document.getElementById("actual-song");
            actualBlock.innerHTML = track;
        }
        }
    };
    xhr.send(null);
}

function changeSong(url) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.onreadychange = function() {
        if (xhr.readyState == 4) {
            refreshCurrentSong();
        }
    };
    xhr.send(null);
}

function nextSong() {
    var NEXT_SONG_URL = "api/action/next";
    changeSong(NEXT_SONG_URL);
}


function previousSong() {
    var PREVIOUS_SONG_URL = "api/action/previous";
    changeSong(PREVIOUS_SONG_URL);
}
