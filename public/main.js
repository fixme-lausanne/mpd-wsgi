
var ctx = null;


// Man paul irish
var requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
     window.webkitRequestAnimationFrame ||
     window.mozRequestAnimationFrame ||
     window.oRequestAnimationFrame ||
     window.msRequestAnimationFrame ||
     function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
       window.setTimeout(callback, 1000/60);
     };
})();


function drawIt(pattern, x, y, s)
{
    var i = 0;
    while (i < pattern.length)
    {
        var row = pattern[i];
        var j = 0;
        while (j < row.length)
        {
            if (row[j])
            {
                
                /*
                ctx.beginPath();  
                ctx.arc(x + j * 5, y + i * 5,2.5,0,Math.PI*2,true);
                ctx.fill();
                ctx.closePath();
                */
                ctx.fillRect(x + j * s, y + i * s, s, s);
            }
            ++j;
        }
        ++i;
    }
}

function drawText(text, x, y, s)
{
    var i = 0;
    while (i < text.length)
    {
        var letter = alphabet[text[i]];
        drawIt(letter, x / 2  + x, y, s);
        x += letter[0].length * s + s ;
        ++i;
    }
}



var TextFade = function()
{
    this.PARTICLES = [];
    this.life = 0;
    this.callBack = null;

    this.setCallBack = function(callBack)
    {
        this.callback = callBack;
    }

    this.addIt = function(pattern, x, y, s)
    {
        var i = 0;
        while (i < pattern.length)
        {
            var row = pattern[i];
            var j = 0;
            while (j < row.length)
            {
                if (row[j])
                {
                    this.PARTICLES.push({
                        x : x + j * s,
                        y : y + i * s,
                        l : 50 - i * 2,
                        s : s,
                        t : 1
                    });
                }
                ++j;
            }
            ++i;
        }
    }

    this.init = function(text, x, y, s)
    {
        var i = 0;
        while (i < text.length)
        {
            var letter = alphabet[text[i]];
            this.addIt(letter, x / 2  + x, y, s);
            x += letter[0].length * s + s ;
            ++i;
        }
        this.life = 0;
    };

    this.render = function()
    {
        ctx.fillStyle= '#101010';
        ctx.fillRect(0,0,1400,800);
        ctx.fillStyle= '#888';
        renderParticles();
    }

    this.animate = function()
    {
        this.life++;
        var PARTICLES = this.PARTICLES;
        var i = 0;
        while (i < PARTICLES.length)
        {
            var p = PARTICLES[i];
            if (p.l < this.life)
            {
                p.y += Math.random() * 20  + 5| 0;
                if (p.y > 600)
                {
                    PARTICLES.splice(i, 1); 
                    --i;
                }   
            }
            ++i;
        }
        if (PARTICLES.length == 0)
        {
            GameObject = this.callback;
        }
    }
    this.update = function()
    {
        this.render();
        this.animate();
    };

    this.input = function()
    {
    };
}

var textFade = new TextFade();


function renderParticles()
        {
            var PARTICLES = textFade.PARTICLES;
            var i         = 0;

            while (i < PARTICLES.length)
            {
                var p = PARTICLES[i];
                if (p.t == 1)
                {
                    ctx.fillRect(p.x, p.y, p.s, p.s);
                }
                if (p.t == 2)
                {
                    ctx.fillRect(p.x, p.y, p.s, p.s * 5);
                }
                if (p.t == 3)
                {
                    ctx.fillStyle = '#fe0061';
                    ctx.fillRect(p.x, p.y, 10, 2);
                    ctx.fillStyle = '#FFF';
                }
                ++i;
            }
        }


function setActualSound(txt) {
    TEXT = txt;
    //document.getElementById('actual-song').textContent = txt;
}

var TEXT = 'Playing';
var CYCLE = 0;

function run() {
    console.log('run');
    requestAnimFrame(run);
    if (!ctx) {return};
    ctx.fillStyle = '#101010';
    ctx.fillRect(0,0,1400, 800);
    ctx.fillStyle = '#888';
    if (CYCLE < 100) {
        drawText(TEXT.toUpperCase(), 700 - CYCLE * 7 + 10, 10, 2);
    }
    if (CYCLE == 100) {
        textFade.init(TEXT.toUpperCase(), 10, 10, 2);
    }
    if (CYCLE > 100) {
        textFade.render();
        textFade.animate();       
    }

    CYCLE++;
    if (CYCLE > 200) {
        CYCLE = 0;
    }

}

run();


function onLoad() {
    ctx = document.getElementById('canvas').getContext('2d');
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
            setActualSound(info);
        }
        }
    };
    xhr.send(null);
}


function togglePlaylist() {
    var playlist_block = document.getElementById("playlist");
    if (playlist_block) {
        playlist_block.parentNode.removeChild(playlist_block);
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
