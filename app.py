#/usr/bin/env python2
########################
##mpd mini interface
########################

from flask import Flask, send_from_directory, abort

from mpd import MPDClient, CommandError
from socket import error as SocketError


HOST = "localhost"
PORT = 6600
PASSWORD = None
MPD_ROOT = "/media/disk1/music/"
CON_ID = {'host':HOST, 'port':PORT}

app = Flask(__name__)

STAT_COMMAND = 0
PREVIOUS_COMMAND = 1
CURRENT_COMMAND = 2
NEXT_COMMAND = 3
STATUS_COMMAND = 4

commands = (STAT_COMMAND, PREVIOUS_COMMAND, CURRENT_COMMAND, NEXT_COMMAND, STATUS_COMMAND)

def mpd_connect():
    """
    Simple wrapper to connect MPD.
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
    client.disconnect()

def mpd_command(command):
    client = mpd_connect()
    if client:
        if command == STAT_COMMAND:
            ret = client.stats()
        elif command == PREVIOUS_COMMAND:
            ret = client.previous()
        elif command == CURRENT_COMMAND:
            ret = client.currentsong()
        elif command == NEXT_COMMAND:
            ret = client.next()
        elif command == STATUS_COMMAND:
            ret = client.status()
        else:
            raise NotImplemented()
        mpd_disconnect(client)
        return ret
    else:
        abort(503)

#simply return the documentation concerning the app
@app.route("/")
def main_page():
    return str()

#ask for the previous song
@app.route("/previous")
def previous_song():
    return str(mpd_command(PREVIOUS_COMMAND))

#ask for the actual song
@app.route("/current")
def current_song():
    return str(mpd_command(CURRENT_COMMAND))

#ask for the next song
@app.route("/next")
def next_song():
    return str(mpd_command(NEXT_COMMAND))

#return general statistics about mpd
@app.route("/stats")
def stats():
    return str(mpd_command(STAT_COMMAND))

#return the actual status of mpd
@app.route("/status")
def status():
    return str(mpd_command(STATUS_COMMAND))

#return the actual file played trough mpd
@app.route("/file")
def download_file():
    file_path = mpd_command(CURRENT_COMMAND)['file']
    if file_path:
        return send_from_directory(MPD_ROOT, file_path)
    else:
        return ""

if __name__ == "__main__":
    app.run(debug=True)
