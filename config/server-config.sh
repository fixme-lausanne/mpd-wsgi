# Dependencies
MPD_ROOT="/var/lib/mpd"
MPD_MUSIC_DIR="$MPD_ROOT/music"
MPD_UPLOAD_DIR="$MPD_ROOT/upload"

echo "System update"
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

# Hosts
echo "/etc/hosts configuration"
HOST_FILE=/etc/hosts
echo | sudo tee -a $HOST_FILE
echo "# mpd-wsgi" | sudo tee -a $HOST_FILE
echo "127.0.0.1 mpd.local" | sudo tee -a $HOST_FILE
echo "127.0.0.1 api.mpd.local" | sudo tee -a $HOST_FILE

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
