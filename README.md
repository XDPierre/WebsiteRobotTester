# WebsiteRobotTester
Makes a request in a lot of diferent browser do check the stability of the site.

## Running using docker compose
---
`The browser can be viewed in the containers using RealVNC, better to see your code running in real time`
### Download RealVNC Viewer
Download here: https://www.realvnc.com/pt/connect/download/viewer/

### Running docker (Can view in the browser in RealVNC)
```
docker build -t taylorshow .
python create-docker-composer.py <NUMBER_OF_BROWSERS>
Exemple: python create-docker-composer.py 10
docker-compose up
```
### Open RealVNC Viewer
```
Type the your local IP + the port (7901 to <NUMBER_OF_BROWSERS>)
Exemple: 192.168.68.122:5900
```
Password: secret (if needed)

To enter the container`s browser with the tested site running the test in real time

## Running using docker compose swarm
---
`The browser cannot be viewed, better for running massive test`
### Running docker
Inside the file docker-compose-swarm.yml, there is a `replicas` varible that be changed to make the swarm create more copies of itself.
```
docker build -t taylorshow .
docker swarm init
docker stack deploy -c docker-compose-swarm.yml selenium-grid
```
Kill all process:
```
docker service rm $(docker service ls -q)
```
