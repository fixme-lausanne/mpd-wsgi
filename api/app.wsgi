import sys
import os
path = os.path.dirname(__file__)
if path not in sys.path:
    sys.path.append(path)

from app import app as application


