# MPD WSGI
This is a project to manage an mpd server by using a HTTP wrapper around the mpc client.

# Server side code
## Dependencies
You will need at least:

- python-mpd2
- flask
- nosetest

_TODO Develop this section_

## Testing and dev
The server side code has a test suite linked to it, you can simply run:

    nosetest test.py

# Client side code
You may wanna either run the server side code and point it to your own
mpd server by changing the config.py `MPD_HOST` variable and call the flask api from your javascript.

## Step by step
### Installation
Installation of yeoman (with sudo)

    # npm install yo

Install the basic `webapp` generator and scaffold a new app

    $ npm install -g generator-webapp
    $ yo webapp --coffee

Install Ruby and the Compass gem

    $ rvm install 2.0.0
    $ rvm use 2.0.0
    $ gem install compass

Install Foundation cli

    $ bower install foundation --sav

Install Ember

    $ bower install ember --save

Enable the frameworks previously installed

    $ grunt bower-install


### Run
Use the command

    $ grunt serve

to start a development server.

### Testing
You can run test with a grunt task

    $ grunt test

The default behavior of grunt is to run `jshint`, all tests and build everything.
