# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # Debian squeeze x64
  config.vm.box = "http://ergonlogic.com/files/boxes/debian-current.box"
  config.vm.provision 'shell', path: 'config/provision.sh'
end
