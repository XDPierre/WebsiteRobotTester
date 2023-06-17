# WebsiteRobotTester
Makes a request in a lot of diferent browser do check the stability of the site.

# Download RealVNC Viewer (Easier DEBUG)
Download here: https://www.realvnc.com/pt/connect/download/viewer/

## Running using docker compose
docker build -t taylorshow .
python create-docker-composer.py <Number of containers>
Exemple: python create-docker-composer.py 10
docker-compose up

## Running using docker compose swarm
docker build -t taylorshow .
docker swarm init
docker stack deploy -c docker-compose-swarm.yml selenium-grid

Kill all process:
docker service rm $(docker service ls -q)
# LocalHost OR Open RealVNC Viewer
```
Type the your local IP + the port (5900)
Exemple: 192.168.68.122:5900
```
Password: secret

To enter the container`s browser with the tested site running the test in real time