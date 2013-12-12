# MPD WSGI
This is a project to manage an mpd server by using a HTTP wrapper around the mpc client.

# Server side code
## Dependencies
You will need at least:

* python-mpd2
* python 2.7
* gunicorn

To install those requirement, first install python pip
Then you can install the dependencies by runnningc.
    
    pip install -r app/requirements.txt

To run the webserver, you will also need to have gunicorn installed and run it with:

    gunicorn -k flask_sockets.worker app:app

In the app directory.

## Testing and dev
The server side code has a test suite linked to it, you can simply run:

    nosetest test.py

# Client side code
You may wanna either run the server side code and point it to your own
mpd server by changing the config.py `MPD_HOST` variable and call the flask api from your javascript.

## Dependencies
* node and npm
* yeoman (yo, bower, grunt)
* rvm (or ruby 2.0.0)

### Installation
Installation of yeoman (with sudo)

    # npm install -g yo

Install grunt packages

    $ npm install

Install bower packages

    $ bower install

Build KnockoutJS

    $ cd app/bower_components/knockoutjs/
    $ npm install
    $ grunt build

Install Ruby and the Compass gem. You don't need `rvm` statements if you already have a working version of Ruby 2.0.0 .

    $ rvm install 2.0.0
    $ rvm use 2.0.0
    $ gem install compass

## Run
Use the command `grunt serve` to start a development server.

If you encounter the following error I'm betting you don't use the correct rvm environment.

> Warning: You need to have Ruby and Compass installed and in your system PATH for this task to work.

Check that you have correctly select it by using the command `rvm use 2.0.0` and retry.

If the problem persists it seems you don't have installed the Compass gem.

## Testing
You can run test with a grunt task

    $ grunt test

The default behavior of grunt is to run `jshint`, all tests and finally to build everything.

# Screenshots
### A first mockup
![First mockup](http://i.imgur.com/H3tAnib.png)
