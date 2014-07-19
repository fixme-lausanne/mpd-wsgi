#/usr/bin/env python2
"""
mpd mini interface
"""

from flask import Flask, send_from_directory, abort, jsonify, render_template, request
from flask_sockets import Sockets
import config
import mpd
from socket import error as SocketError
import update_music
import logging
import threading
import os
from werkzeug import secure_filename
import lastfm


app = Flask(__name__)

app_doc = None

socket = Sockets(app)


def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = "*"
    response.headers['Access-Control-Allow-Methods'] =  "POST, GET, OPTIONS, PUT, DELETE"
    response.headers['Access-Control-Allow-Headers'] = "Content-Type"
    response.headers['Access-Control-Allow-Credentials'] = "true"
    return response

app.after_request(add_cors_headers)


class MpdClient(mpd.MPDClient):
    """Enumeration of the commands available.
    """
    Authorized_commands = ('stats', 'play', 'pause', 'toggle_play',
                           'playlistinfo', 'currentsong', 'next',
                           'previous', 'status', 'search', 'clear',
                           'add', 'cover', 'delete', 'seek')

    def __init__(self, *args, **kwargs):
        super(MpdClient, self).__init__(*args, **kwargs)
        self.lastfm_api = lastfm.Api(config.LASTFM_KEY, no_cache=True)

    def execute_command(self, command, *args, **kwargs):
        if command in MpdClient.Authorized_commands:
            command_function = getattr(self, command, None)
            if not command_function:
                abort(400)
            else:
                ret = command_function(*args, **kwargs)
                if ret:
                    ret = dict(ret)
                else:
                    ret = {}
                ret['status'] = 'success'
                return ret
        else:
            abort(401)

    def playlistinfo(self, *args, **kwargs):
        ret = super(MpdClient, self).playlistinfo(*args, **kwargs)
        return {'songs':ret}

    def seek(self, time):
        current = self.currentsong()
        return super(MpdClient, self).seek(current.get('pos', 0), time)

    def search(self, limit, *args, **kwargs):
        results = super(MpdClient, self).search(*args, **kwargs)
        return {'songs': results[:limit]}

    def cover(self):
        d = {"extralarge": None, "large": None, "medium": None, "mega": None, "small": None}
        current = self.currentsong()
        if 'album' in current and 'artist' in current:
            album = self.lastfm_api.get_album(current.get('album', ''), current.get('artist', ''))
            if album.id:
                d.update(album.image)
        return d

    def toggle_play(self):
        if self.status()['state'] == 'play':
            self.pause()
        else:
            self.pause()

    @staticmethod
    def connect_mpd():
        """
        Simple wrapper to connect MPD. This method will use the flask configuration.
        """
        #connection to mpd
        client = MpdClient()
        try:
            client.connect(host=config.HOST, port=config.PORT)
        except SocketError as e:
            logging.error(e)
            abort(500)
        except mpd.ConnectionError as e:
            logging.error(e)
            abort(500)

        # Auth if password is set non False
        if config.PASSWORD:
            try:
                client.password(config.PASSWORD)
            except mpd.CommandError as e:
                logging.error(e)
                abort(500)
        return client


def mpd_command(command, *args, **kwargs):
    """
    Wrapper around the mpd commands.
    """
    client = MpdClient.connect_mpd()
    ret = client.execute_command(command, *args, **kwargs)
    client.disconnect()
    return ret


def generate_doc():
    """
    Generate a dictionnary for all the route for the application with the
    route url as key and the docstring of the callback method as value.
    """
    url_map = app.url_map

    doc = list()
    for i in url_map.iter_rules():
        if "static" in i.rule:
            continue
        url = i.rule
        method = i.endpoint
        methods = filter(lambda a: a not in ['HEAD', 'OPTIONS'], i.methods)
        doc.append(dict(doc=eval(i.endpoint).__doc__, url=url, method=method, methods=methods))
    return doc


@app.route("/")
def main_page():
    """
    Simply return the documentation concerning the app.
    """
    global app_doc
    if not app_doc:
        logging.info("Generate doc")
        app_doc = generate_doc()
    return render_template("help.html", doc=app_doc)


@app.route("/action/seek/<int:time>")
def seek(time):
    """Seek to a particular time in the current song
    """
    return jsonify(mpd_command('seek', time))


@app.route("/action/pause")
def pause():
    """
    Pause the actual song.

    @return an empty json dictionnary.
    """
    return jsonify(mpd_command('pause'))

@app.route("/action/play")
def play():
    """
    Play the actual song.

    @return an empty json dictionnary.
    """
    return jsonify(mpd_command('play'))

@app.route("/action/play/<int:songid>")
def play_song(songid):
    """
    Play the actual song.

    @return an empty json dictionnary.
    """
    return jsonify(mpd_command('play', songid))

@app.route("/cover")
def cover():
    """return a list of cover of different sizes.
    @return a json with three keys which values are the images corresponding to the size of the key. they are:
      -extralarge
      -large
      -medium
      -small

    and the usual success key.
    """
    return jsonify(mpd_command('cover'))

@app.route("/action/play_pause")
def toggle_play():
    """Toggle the actual state from pause to play and from play to pause.

    @return an empty json dictionnary.
    """
    return jsonify(mpd_command('toggle_play'))


@app.route("/action/previous")
def previous_song_action():
    """Pass to the previous song.

    @return an empty json dictionnary.
    """
    return jsonify(mpd_command('previous'))


@app.route("/action/next")
def next_song_action():
    """Pass to the next song.

    @return an empty json dictionnary.
    """
    return jsonify(mpd_command('next'))

@app.route("/current")
def current_song():
    """Ask for the actual song.

    @return a json dictionnary containing the information.
    """
    return jsonify(mpd_command('currentsong'))


@app.route("/stats")
def stats():
    """Return general statistics about mpd.

    @return a json dictionnary containing the general statistic for mpd.
    """
    return jsonify(mpd_command('stats'))


@app.route("/status")
def status():
    """Return the actual status of mpd.

    @return a json dictionnary containing the actual mpd status.
    """
    return jsonify(mpd_command('status'))


@app.route("/file", methods=['POST'])
def upload_file():
    """Add files to the mpd library. 
    """
    files = request.files.getlist("file[]")
    file_names = []
    for f in files:
        if f:
            filename = secure_filename(f.filename)
            f.save(os.path.join(config.MPD_ROOT, filename))
            file_names.append(filename)
    return jsonify({'uploaded_files': file_names})


@app.route("/file", methods=['GET'])
def download_file():
    """Return the actual file played trough mpd or an empty string if there is no file playing.
    """
    file_path = mpd_command('currentsong').get('file')
    if file_path:
        return send_from_directory(config.MPD_ROOT, file_path, as_attachment=True)
    else:
        return ""


up_thread = threading.Event()

def update_thread():
    if update_music.update_music(config.UPLOAD_DIR, config.MPD_ROOT):
        mpd_command('update_library')
    up_thread.clear()


@app.route("/update")
def update_lib():
    """Update mpd and push the music from the ftp.

    @return either an empty json or a json with a msg key containing the error message.
    """
    if not up_thread.is_set():
        up_thread.set()
        threading.Thread(target=update_thread).start()
    return jsonify({})


@app.route("/playlist", methods=['GET'])
def playlist():
    """Return the playlist of the next song to be played
    """
    return jsonify(mpd_command('playlistinfo'))


@app.route("/playlist", methods=['PUT'])
def playlist_add():
    """
    """
    if 'song' in request.form:
        return jsonify(mpd_command('add', request.form['song']))
    else:
        abort(400)


@app.route("/playlist/<int:songid>", methods=['DELETE'])
def song_delete(songid):
    try:
        return jsonify(mpd_command('delete', songid))
    except mpd.CommandError:
        abort(404)


@app.route("/playlist", methods=['DELETE'])
def playlist_delete():
    """if no argument named 'song' was given:
        Clean the playlist by removing all the elements in it.
    else:
        remove the list of songs contained in the playlist, the argument is a
        integer list for the index of the song to be removed.
    Note: the playlist is 0 indexed
    """
    return jsonify(mpd_command('clear'))


SEARCH_TERMS = ['any', 'artist', 'album', 'title']


@app.route("/search")
def search():
    """Search a song for any of this component or any
    any
    artist
    album,
    title
    @param a json with any of the submentioned key for a search
    """
    limit = config.LIMIT_SEARCH
    if 'limit' in request.args:
        try:
            limit = int(request.args['limit'])
        except ValueError:
            pass
    for search_term in SEARCH_TERMS:
        if search_term in request.args and request.args[search_term]:
            return jsonify(mpd_command('search', limit, search_term, request.args[search_term]))
    else:
        abort(400)


@socket.route('/player_change')
def player_change(ws):
    """Blocking call, will send a message when the state of the player has changed (next, pause, play, time)
    """
    while True:
        #blocking method
        mpd_command('idle', 'player')
        ws.send(mpd_command('currentsong'))


@socket.route("/playlist_change")
def playlist_change(ws):
    """Blocking call, will send the playlist if it has changed
    """
    while True:
        mpd_command('idle', 'playlist')
        ws.send(mpd_command('playlist'))
