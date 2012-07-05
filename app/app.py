#/usr/bin/env python2
"""
mpd mini interface
"""

from flask import Flask, send_from_directory, abort, jsonify, render_template

from mpd import MPDClient, CommandError
from socket import error as SocketError
import pydoc
import inspect
import update_music
import os

HOST = "localhost"
PORT = 6600
PASSWORD = None
MPD_ROOT = "/media/disk1/music/"
CON_ID = {'host':HOST, 'port':PORT}

app = Flask(__name__)
app_doc = None

PREVIOUS_COMMAND = 0
NEXT_COMMAND = 2
CURRENT_INFO = 3
STAT_INFO = 4
STATUS_INFO = 5
commands = (PREVIOUS_COMMAND, NEXT_COMMAND, CURRENT_INFO, STAT_INFO, STATUS_INFO)

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
        elif command == CURRENT_INFO:
            ret = client.currentsong()
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

def generate_doc():
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
        print("Generate doc")
        app_doc = generate_doc()
    return render_template("help.html", doc=app_doc)

@app.route("/action/previous")
def previous_song_action():
    """
    Pass to the previous song.
    """
    return jsonify(mpd_command(PREVIOUS_COMMAND))

@app.route("/action/next")
def next_song_action():
    """
    Pass to the next song.
    """
    return jsonify(mpd_command(NEXT_COMMAND))

@app.route("/current")
def current_song():
    """
    Ask for the actual song.
    """
    return jsonify(mpd_command(CURRENT_INFO))

@app.route("/stats")
def stats():
    """
    Return general statistics about mpd.
    """
    return jsonify(mpd_command(STAT_INFO))

@app.route("/status")
def status():
    """
    Return the actual status of mpd.
    """
    return jsonify(mpd_command(STATUS_INFO))

@app.route("/file")
def download_file():
    """
    Return the actual file played trough mpd.
    """
    file_path = mpd_command(CURRENT_INFO)['file']
    if file_path:
        return send_from_directory(MPD_ROOT, file_path, as_attachment=True)
    else:
        return ""

@app.route("/update")
def update_lib():
    """
    Update mpd and push the music from the ftp.
    """
    if update_music.update_music():
        return ""
    else:
        abort(501) #not imple

@app.route("/poll")
def poll_new_song():
    """
    block until a new song is played on mpd
    """
    abort(501)

    return "Not implemented yet"
if __name__ == "__main__":
    app.run(debug=True)
