HOST = "localhost"
PORT = 6600
PASSWORD = None
MPD_ROOT = "/media/disk1/music/"

UPLOAD_DIR = "/media/disk1/share/incoming/incoming/music"

try:
    from local_settings import *
except ImportError:
    print("cannot import local settings")
