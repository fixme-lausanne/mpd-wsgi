#/usr/bin/env python2
"""
mpd mini interface
"""

from flask import Flask, send_from_directory, abort, jsonify, render_template
import config
import mpd
from socket import error as SocketError
import update_music
import logging
import threading


app = Flask(__name__)
app_doc = None

class MpdClient(mpd.MPDClient):
    """Enumeration of the commands available.
    """
    Authorized_commands = (
    )


    def execute_command(self, command, *args, **kwargs):
        if command in MpdClient.Authorized_commands:
            ret = getattr(self, command)(*args, **kwargs)
            if ret:
                ret = dict(ret)
            else:
                ret = {}
            ret['status'] = 'success'
            return ret


    def toggle_play(self):
        if self.status()['state'] == 'play':
            self.pause()
        else:
            self.pause()

    def playlist(self):
        playlist_raw = super(MpdClient, self).playlist()
        ret_files = map(lambda a: a.split(':', 1)[1], playlist_raw)
        ret = {'songs':ret_files}


def mpd_connect(command, *args, **kwargs):
    """
    Simple wrapper to connect MPD.
    """
    #connection to mpd
    client = mpd.MPDClient()
    try:
        client.connect(host=config.HOST, port=config.PORT)
    except SocketError as e:
        logging.error(e)
        return None
    except mpd.ConnectionError as e:
        logging.error(e)
        return None

    # Auth if password is set non False
    if config.PASSWORD:
        try:
            client.password(config.PASSWORD)
        except mpd.CommandError as e:
            logging.error(e)
            return None
    return client

def mpd_command(command, *args, **kwargs):
    """
    Wrapper around the mpd commands.
    """
    client = mpd_connect()
    if client:
        ret = client.execute(command, *args, **kwargs)
    else:
        abort(501)  # not implemented
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
        doc.append(dict(doc=eval(i.endpoint).__doc__, url=url, method=method))
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


@app.route("/action/pause")
def pause():
    """
    Pause the actual song.

    @return an empty json dictionnary.
    """
    return jsonify(mpd_command(PAUSE))

@app.route("/action/play")
def play():
    """
    Play the actual song.

    @return an empty json dictionnary.
    """
    return jsonify(mpd_command(PLAY))

@app.route("/action/play_pause")
def toggle_play():
    """
    Toggle the actual state from pause to play and from play to pause.

    @return an empty json dictionnary.
    """
    return jsonify(mpd_command(TOGGLE_PLAY))


@app.route("/action/previous")
def previous_song_action():
    """
    Pass to the previous song.

    @return an empty json dictionnary.
    """
    return jsonify(mpd_command(PREVIOUS_COMMAND))


@app.route("/action/next")
def next_song_action():
    """
    Pass to the next song.

    @return an empty json dictionnary.
    """
    return jsonify(mpd_command(NEXT_COMMAND))


@app.route("/current")
def current_song():
    """
    Ask for the actual song.

    @return a json dictionnary containing the information.
    """
    return jsonify(mpd_command(CURRENT_INFO))


@app.route("/stats")
def stats():
    """
    Return general statistics about mpd.

    @return a json dictionnary containing the general statistic for mpd.
    """
    return jsonify(mpd_command(STAT_INFO))

@app.route("/playlist")
def playlist():
    """Return the playlist of the next song to be played
    """
    return jsonify(mpd_command(PLAYLIST))

@app.route("/status")
def status():
    """
    Return the actual status of mpd.

    @return a json dictionnary containing the actual mpd status.
    """
    return jsonify(mpd_command(STATUS_INFO))


@app.route("/file")
def download_file():
    """
    Return the actual file played trough mpd or an empty string if there is no file playing.
    """
    file_path = mpd_command(CURRENT_INFO).get('file')
    if file_path:
        return send_from_directory(config.MPD_ROOT, file_path, as_attachment=True)
    else:
        return ""


up_thread = threading.Event()


def update_thread():
    if update_music.update_music(config.UPLOAD_DIR, config.MPD_ROOT):
        try:
            mpd_command(UPDATE_LIBRARY)
        except CommandError as e:
            logging.error("Command error {!s}".format(e))
    up_thread.clear()


@app.route("/update")
def update_lib():
    """
    Update mpd and push the music from the ftp.

    @return either an empty json or a json with a msg key containing the error message.
    """
    if not up_thread.is_set():
        up_thread.set()
        threading.Thread(target=update_thread).start()
    return jsonify({})


@app.route("/poll")
def poll_new_song():
    """
    block until a new song is played on mpd
    """
    return jsonify(mpd_command(POLL_NEXT))

if __name__ == "__main__":
    app.run(debug=True)
