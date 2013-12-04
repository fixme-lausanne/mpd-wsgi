# MPD WSGI
This is a project to manage an mpd server by using a HTTP wrapper around the mpc client. 

#Server side code
##Dependencies
You will need at least:

- python-mpd2
- flask 
- nosetest
- flask-sockets

To run the webserver, you will also need to have gunicorn installed and run it with:

    gunicorn -k flask_sockets.worker hello:app

In the app directory.

##Testing and dev
The server side code has a test suite linked to it, you can simply run:

    nosetest test.py

#Client side code
You may wanna either run the server side code and point it to your own
mpd server by changing the config.py `MPD_HOST` variable and call the flask api from your javascript.
