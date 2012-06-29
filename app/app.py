#/usr/bin/env python2
"""
mpd mini interface
"""

from flask import Flask, send_from_directory, abort, jsonify

from mpd import MPDClient, CommandError
from socket import error as SocketError
import pydoc
import inspect

HOST = "localhost"
PORT = 6600
PASSWORD = None
MPD_ROOT = "/media/disk1/music/"
CON_ID = {'host':HOST, 'port':PORT}

app = Flask(__name__)


PREVIOUS_COMMAND = 0
NEXT_COMMAND = 1
PREVIOUS_INFO = 2
CURRENT_INFO = 3
NEXT_INFO = 4
STAT_INFO = 5
STATUS_INFO = 6



commands = (PREVIOUS_COMMAND, NEXT_COMMAND, PREVIOUS_INFO, CURRENT_INFO, NEXT_INFO, STAT_INFO, STATUS_INFO)

def mpd_connect():
    """
    Simple wrapper to disconnect MPD.
    """
    #connection to mpd
    client = MPDClient()
    try:
        client.connect(**CON_ID)
    except SocketError:
        return None

    # Auth if password is set non False
    if PASSWORD:
        try:
            client.password(PASSWORD)
        except CommandError:
            return None
    return client

def mpd_disconnect(client):
    """
    Simple wrapper to disconnect the client to MPD.
    """
    client.disconnect()

def mpd_command(command):
    client = mpd_connect()
    if client:
    
        if command == PREVIOUS_COMMAND: 
            ret = client.previous()
        elif command == NEXT_COMMAND:
            ret = client.next()
        elif command == PREVIOUS_INFO:
            pass
        elif command == CURRENT_INFO:
            ret = client.currentsong()
        elif command == NEXT_INFO:
            pass
        elif command == STAT_INFO:
            ret = client.stats()
        elif command == STATUS_INFO:
            ret = client.status()
        else:
            raise NotImplemented()
        mpd_disconnect(client)
        return ret or ""
    else:
        abort(503)

def about():
    map = app.url_map
    doc = "The URL you can access are : <br>"
    for i in map.iter_rules():
        if i.contains("/static/"):
            continue
        url_name = i.rule
        doc += url_name
        doc += "<br>"
    return doc

@app.route("/")
def main_page():
    """
    simply return the documentation concerning the app
    """
    return str(about())

@app.route("/action/previous")
def previous_song_action():
    """
    Pass to the previous song
    """
    return jsonify(mpd_command(PREVIOUS_COMMAND))

@app.route("/action/next")
def next_song_action():
    """
    Pass to the next song
    """
    return jsonify(mpd_command(NEXT_COMMAND))

@app.route("/previous")
def previous_song_info():
    return jsonify(mpd_command(PREVIOUS_INFO))

@app.route("/current")
def current_song():
    """
    ask for the actual song
    """
    return jsonify(mpd_command(CURRENT_INFO))

@app.route("/next")
def next_song_info():
    """
    ask for the next song
    """
    return jsonify(mpd_command(NEXT_INFO))

@app.route("/stats")
def stats():
    """
    return general statistics about mpd
    """
    return jsonify(mpd_command(STAT_INFO))

@app.route("/status")
def status():
    """
    return the actual status of mpd
    """
    return jsonify(mpd_command(STATUS_INFO))

@app.route("/file")
def download_file():
    """
    return the actual file played trough mpd
    """
    file_path = mpd_command(CURRENT_INFO)['file']
    if file_path:
        return send_from_directory(MPD_ROOT, file_path, as_attachment=True)
    else:
        return ""

if __name__ == "__main__":
    app.run(debug=True)
