#/usr/bin/env python2
import os
import subprocess
SCRIPT = "update_music.sh"

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

def update_music_py():
    #transform all wav to ogg
    #move all directory in music
    #update group
    #???
    #profit
    raise NotImplemented()

if __name__ == "__main__":
    update_music()
