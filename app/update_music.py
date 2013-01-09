#/usr/bin/env python2
import os
import shutil
import logging

def update_music(upload_dir, music_dir):
    """
    simple wrapper around the update script
    """
    #simple check
    #move everything from UPLOAD_DIR to MUSIC_DIR
    try:
        dir_list = os.listdir(upload_dir)
    except OSError as e:
        logging.error(e)
        return
    root_path = os.path.abspath(upload_dir)

    #copy directory
    for f in [os.path.join(root_path, f) for f in dir_list]:
        try:
            shutil.move(f, music_dir)
        except OSError as e:
            logging.error(e)

    return True


if __name__ == "__main__":
    import config
    update_music(config.UPLOAD_DIR, config.MPD_ROOT)
