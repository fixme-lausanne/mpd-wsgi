HOST = "mpd.fixme.ch"
PORT = 6600
PASSWORD = None
MPD_ROOT = "/media/disk1/music/"

UPLOAD_DIR = "/media/disk1/share/incoming/incoming/music"
LIMIT_SEARCH = 50

#config that should be locally changed
LASTFM_KEY = ""


try:
    from local_settings import *
except ImportError:
    print("cannot import local settings")
