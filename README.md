# WebsiteRobotTester
Makes a request in a lot of diferent browser do check the stability of the site.

The docker part is not fully implemented wet

## New
docker build -t taylorshow .
docker-compose up

## OLD Running and testing method
# Run for dependencies of project
npm install

# Download RealVNC Viewer (Easier DEBUG)
Download here: https://www.realvnc.com/pt/connect/download/viewer/

# For testing the code:
```
docker run -d -p 4444:4444 -p 7900:7900 --name taylorshow1 --shm-size="2g" selenium/standalone-chrome:latest
docker run -d -p 4441:4444 -p 7901:7900 --name taylorshow1 --shm-size="2g" selenium/standalone-chrome:latest
OR
(DEBUG)
docker run -d -p 4444:4444 -p 5900:5900 --name taylorshow1 --shm-size="2g" selenium/standalone-chrome-debug:latest
```
 - TODO Change how to port works, becaus right now it need to change the PORT in the code, for this exemple: docker run -d -p 4441:4444, for the script to work... usingServer("http://localhost:4441/wd/hub/") 

# LocalHost OR Open RealVNC Viewer
```
Open: http://localhost:7900/
OR
(DEBUG)
Type the your local IP + the port (5900)
Exemple: 192.168.68.122:5900
```

Password: secret
# Finaly run in the terminal
node index.js

