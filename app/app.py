#/usr/bin/env python2
"""
mpd mini interface
"""

from flask import Flask, send_from_directory, abort, jsonify, render_template
import config
from mpd import MPDClient, CommandError, ConnectionError
from socket import error as SocketError
import update_music
import logging
import threading

CON_ID = {'host':config.HOST, 'port':config.PORT}

app = Flask(__name__)
app_doc = None

PREVIOUS_COMMAND = 0
NEXT_COMMAND = 2
CURRENT_INFO = 3
STAT_INFO = 4
STATUS_INFO = 5
POLL_NEXT = 6
UPDATE_LIBRARY = 7
TOGGLE_PLAY = 8
commands = (PREVIOUS_COMMAND, NEXT_COMMAND, CURRENT_INFO, STAT_INFO,
            STATUS_INFO, POLL_NEXT, UPDATE_LIBRARY, TOGGLE_PLAY)

def mpd_connect():
    """
    Simple wrapper to connect MPD.
    """
    #connection to mpd
    client = MPDClient()
    try:
        client.connect(**CON_ID)
    except SocketError as e:
        logging.error(e)
        return None
    except ConnectionError as e:
        logging.error(e)
        return None

    # Auth if password is set non False
    if config.PASSWORD:
        try:
            client.password(config.PASSWORD)
        except CommandError as e:
            logging.error(e)
            return None
    return client

def mpd_disconnect(client):
    """
    Simple wrapper to disconnect the client to MPD.
    """
    client.disconnect()

def mpd_command(command):
    """
    Wrapper around the mpd commands.
    """
    client = mpd_connect()
    if client:
        if command == PREVIOUS_COMMAND:
            ret = client.previous()
        elif command == NEXT_COMMAND:
            ret = client.next()
        elif command == CURRENT_INFO:
            ret = client.currentsong()
        elif command == STAT_INFO:
            ret = client.stats()
        elif command == STATUS_INFO:
            ret = client.status()
        elif command == UPDATE_LIBRARY:
            ret = client.update()
        elif command == TOGGLE_PLAY:
            ret = client.play()
        else:
            abort(501)  # not implemented
        mpd_disconnect(client)
        return ret or {}
    else:
        abort(503)


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


@app.route("/action/play")
def toggle_play():
    """
    Play the actual.

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
