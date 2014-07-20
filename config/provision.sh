export DEBIAN_FRONTEND=noninteractive

date1=$(date +"%s")

su -c "source /vagrant/config/server-config.sh" vagrant

date2=$(date +"%s")
diff=$(($date2-$date1))
echo "$(($diff / 60)) minutes and $(($diff % 60)) seconds elapsed."
