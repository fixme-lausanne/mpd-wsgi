function onLoad() {
    refreshCurrentSong();
}

var SONG_URL = "https://mpd.fixme.ch/api/current";
var PLAYLIST_URL = "https://mpd.fixme.ch/api/playlist";

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

function togglePlaylist() {
    var playlist_block = document.getElementById("playlist");
    if (playlist_block) {
        playlist_block.parentChild.removeChild(playlist_block);
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", PLAYLIST_URL, true);

        xhr.onreadystatechange = function() {
          if ( xhr.readyState === 4) {
        if (xhr.status === 200) {
            try {
              var d = document.getElementById('wrapper');
              var playlist_block  = document.createElement('div');
              playlist_block.id = "playlist";
              playlist_block.class = "central-block";
              var parsed_text = jsonParse(xhr.responseText);
	      var songs = parsed_text.songs;
	      var songs_list = document.createElement("lu")
	      for (var i = 0; i < songs.length;i++) {
		var song = songs[i];
		var song_block = document.createElement("li");
		song_block.textContent = song;
		songs_list.appendChild(song_block);
	      }
	      playlist_block.appendChild(songs_list);
              d.appendChild(playlist_block);
            } catch (err) {
            //json parsing failed or doesn't contain the correct element
            console.log(err);
            return;
            }
        }
	  }

    }
    xhr.send(null);
}
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
