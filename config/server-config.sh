# Dependencies
MY_REPO="https://dl.dropboxusercontent.com/u/103118232/deb-packages/"
ARCH="amd64"

echo "deb $MY_REPO $ARCH/" | sudo tee -a /etc/apt/sources.list

echo "System update"
sudo apt-get update -y
echo "Install packages"
sudo apt-get install -y \
    apt-transport-https \
    subversion git \
    python-pip python python-dev \
    nginx

# Python
echo "Install python packages"
cd /vagrant/api
sudo pip install -r requirements.txt

# NodeJS
echo "Install nodeJS"
sudo apt-get install -y --force-yes nodejs
node -v
npm -v

# Client side
echo "Install client dependencies"
cd /vagrant/client
npm install
node node_modules/bower/bin/bower install
node node_modules/gulp/bin/gulp.js build

# Finish
echo "Run the api server with:"
echo "    cd /vagrant/api"
echo "    gunicorn -k flask_sockets.worker app:app"
echo
echo "Run the web client in dev mode"
echo "    cd /vagrant/client"
echo "    gulp default"
