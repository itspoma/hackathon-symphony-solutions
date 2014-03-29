# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.hostname = "vm-hackathon-symphony-solutions"

  config.vm.box = "ubuntu-precise-32"
  config.vm.box_url = "http://files.vagrantup.com/precise32.box" # Ubuntu precise 32 VirtualBox

  config.ssh.shell = "bash -c 'BASH_ENV=/etc/profile exec bash'"

  config.vm.network :private_network, ip: "33.33.33.33"

  nfs_setting = RUBY_PLATFORM =~ /darwin/ || RUBY_PLATFORM =~ /linux/
  config.vm.synced_folder "./shared/", "/var/shared", id: "vagrant-root", :nfs => nfs_setting

  config.vm.provision :chef_solo do |chef|
    chef.log_level = :info

    chef.cookbooks_path = ["vagrant/cookbooks"]

    # chef.add_recipe "build-essential"
    chef.add_recipe "apt"
    chef.add_recipe "mc"
    # chef.add_recipe "php"
    # chef.add_recipe "orientdb"

    chef.json = { 
        # "php" => {
        #     "directives" => {
        #         "error_log" => "/vagrant/logs/php.log",
        #         "display_errors" => "On"
        #     }
        # }
    }
  end

  config.vm.provision "shell", inline: "echo VM booted successfully!"
end