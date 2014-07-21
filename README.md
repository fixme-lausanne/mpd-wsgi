# MPD WSGI
This is a project to manage an mpd server by using a HTTP wrapper around the mpc client.

# Development
You can use [vagrant](http://www.vagrantup.com/) to get a full working dev env.

Navigate to the root of git project and start the virtual machine

    git clone https://github.com/fixme-lausanne/mpd-wsgi.git
    cd mpd-wsgi
    vagrant up

The provisioning can take a while (~12min on a mid-2010 MacBook Pro) but will be run only once.
If you want to see what we are doing during that step, check `config/server-config.sh`.

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
## Dependencies
* node and npm
* ruby (v1.8+)

### Installation
Install build system and js libraries

    $ npm install

Install assets

    $ bower install

Install the Compass gem

    $ gem install compass --no-rdoc --no-ri

## Run
Use the command `gulp default` (or just `gulp`) to start a development server listening on port `3000`.

Run the `gulp build` to compile JS, SASS and other assets.
