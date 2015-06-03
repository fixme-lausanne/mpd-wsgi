HOST = "mpd.local"
PORT = 6600
PASSWORD = None
MPD_ROOT = "/var/lib/mpd/music"

UPLOAD_DIR = "/var/lib/mpd/upload"
LIMIT_SEARCH = 50

#config that should be locally changed
LASTFM_KEY = ""

try:
    from local_settings import *
except ImportError:
    print("cannot import local settings")
