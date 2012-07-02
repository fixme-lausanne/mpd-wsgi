#/usr/bin/env python2
import os
import subprocess
SCRIPT = "/home/sysadmin/script/update_music.sh"

def update_music():
    """
    simple wrapper around the update script
    """
    if os.path.isfile(SCRIPT):
        try:
            subprocess.call(SCRIPT)
            return True
        except:
            return False
    else:
        return False

    #we begin by changing the format of the wav file to mp3
if __name__ == "__main__":
    update_library()
