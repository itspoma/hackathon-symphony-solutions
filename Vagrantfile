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
    # chef.log_level = :info
    chef.log_level = :debug

    chef.cookbooks_path = ["vagrant/cookbooks"]

    # chef.add_recipe "build-essential"
    chef.add_recipe "apt"
    chef.add_recipe "mc"
    chef.add_recipe "curl"
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

  # config.vm.provision :shell, inline: "sudo apt-get install -y build-essential"
  # sudo apt-get install -y libmysql-ruby libmysqlclient-dev
  # curl -sSL https://get.rvm.io | bash -s stable
  # source /home/vagrant/.rvm/scripts/rvm
  # rvm install 2.0.0
  # rvm use 2.0.0@hackaton --create --default
  # gem install mysql2 -v '0.3.15'
  # bundle install
  # sudo apt-get install -y mysql-server mysql-client
  # sudo apt-get install -y mysql-client-core-5.5
  # sudo aptitude purge mysql-server
  # sudo aptitude install mysql-server
  # rake db:create
  # rake db:migrate
  # rails s

  # config.vm.provision :shell, path: "vagrant/install-rvm.sh", args: "stable"
  # config.vm.provision :shell, path: "vagrant/install-ruby.sh", args: "1.9.3"
  # config.vm.provision :shell, path: "vagrant/install-ruby.sh", args: "2.0.0 rails"

  config.vm.provision :shell, inline: "echo VM booted successfully!"
end