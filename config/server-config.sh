# Dependencies
MY_REPO="https://dl.dropboxusercontent.com/u/103118232/deb-packages/"
ARCH="amd64"
MPD_ROOT="/var/lib/mpd"
MPD_MUSIC_DIR="$MPD_ROOT/music"
MPD_UPLOAD_DIR="$MPD_ROOT/upload"

echo "System update"
sudo apt-get update -y
sudo apt-get install -y apt-transport-https
echo "deb $MY_REPO $ARCH/" | sudo tee -a /etc/apt/sources.list
sudo apt-get update -y

echo "Install packages"
sudo apt-get install -y \
    subversion git wget \
    python-pip python python-dev \
    mpd mpc \
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
sudo gem install compass --no-ri --no-rdoc
npm install
node node_modules/bower/bin/bower install
node node_modules/gulp/bin/gulp.js build

# Hosts
echo "/etc/hosts configuration"
HOST_FILE=/etc/hosts
echo | sudo tee -a $HOST_FILE
echo "# mpd-wsgi" | sudo tee -a $HOST_FILE
echo "127.0.0.1 mpd.local" | sudo tee -a $HOST_FILE
echo "127.0.0.1 api.mpd.local" | sudo tee -a $HOST_FILE
echo "127.0.0.1 client.mpd.local" | sudo tee -a $HOST_FILE

# MPD
echo "MPD configuration"
sudo mkdir $MPD_MUSIC_DIR $MPD_UPLOAD_DIR
sudo chmod -R a+rw $MPD_ROOT

echo "Get some music"
cd $MPD_MUSIC_DIR
wget -i /vagrant/config/sample_music.txt

echo "Create MPD db"
sudo service mpd start
mpc update

# Finish
echo
echo "_______________________________________________"
echo
echo "Run the api server with:"
echo "    cd /vagrant/api"
echo "    gunicorn -k flask_sockets.worker app:app"
echo
echo "Run the web client in dev mode"
echo "    cd /vagrant/client"
echo "    gulp default"
