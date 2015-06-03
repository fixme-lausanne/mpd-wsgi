# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # Debian squeeze x64
  config.vm.box = 'ffuenf/debian-7.8.0-amd64'
  config.vm.provision 'shell', path: 'config/provision.sh'

  config.vm.network :private_network, type: 'dhcp'
  config.vm.hostname = 'mpd.local'
  config.hostsupdater.aliases = ['api.mpd.local']
end
