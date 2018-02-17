#!/usr/bin/sh

mkdir ~/dependencies
cd ~/dependencies
mkdir bin

#Download and install c compiler
sudo apt-get install gcc g++

#Download and instal make
apt install make

#Download and instal zlib
sudo apt-get install zlib1g-dev

#Download and install Python
sudo apt-get install python3-dev libffi-dev libssl-dev
wget https://www.python.org/ftp/python/3.6.0/Python-3.6.0.tgz  
tar xvf Python-3.6.0.tgz
rm Python-3.6.0.tgz
cd Python-3.6.0
./configure --enable-optimizations  
make -j8  
sudo make install

cd ..

#Download and install pip
sudo apt install python3-pip

#Download and install node
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install npm

#Download mysql client
sudo apt-get install libmysqlclient-dev

#Set up environment
cd ~
git clone https://github.com/angadkalra/mea.git

cd ~/mea
cd backend
python3.6 -m venv env
source env/bin/activate
pip3 install -r requirements.txt
./manage.py migrate
cd ../frontend
npm install





