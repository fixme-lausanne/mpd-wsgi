#/usr/bin/env python2
##mpd mini interface 
import sys
import pprint

from flask import Flask

import mpd
from mpd import MPDClient, CommandError
from socket import error as SocketError

HOST = "localhost"
PORT = 6600
PASSWORD = None

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
        if command == PREVIOUS_COMMAND:
            ret = client.playlistfind(-1)
        if command == CURRENT_COMMAND:
            ret = client.currentsong()
        elif command == NEXT_COMMAND:
            ret = client.playlistfind(1)
        elif command == STATUS_COMMAND:
            ret = client.status()
        mpd_disconnect(client)
        return ret
    else:
        return ""

#ask for the next song
@app.route("/previous")
def previous_song():
    return str(mpd_command(PREVIOUS_COMMAND))


#ask for the actual song
@app.route("/")
def current_song():
    return str(mpd_command(CURRENT_COMMAND))

#ask for the previous song
@app.route("/next")
def next_song():
    return str(mpd_command(NEXT_COMMAND))

@app.route("/stats")
def stats():
    return str(mpd_command(STAT_COMMAND))
    
@app.route("/status")
def status():
    return str(mpd_command(STATUS_COMMAND))

if __name__ == "__main__":
    app.run(debug=True)
