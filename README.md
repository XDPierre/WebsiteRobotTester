# WebsiteRobotTester
Makes a request in a lot of diferent browser do check the stability of the site.

# For testing the code:
docker run -d -p 4444:4444 -p 7900:7900 --shm-size="2g" taylorshow:latest

Using docker run:
# Cria Grid docker
docker network create grid
# Cria Selenium Hub
docker run -d -p 4442-4444:4442-4444 -p 7900:7900 --net grid --name selenium-hub selenium/hub:latest

 docker run -d --net grid -e SE_EVENT_BUS_HOST=selenium-hub --shm-size="2g" -e SE_EVENT_BUS_PUBLISH_PORT=4442 -e SE_EVENT_BUS_SUBSCRIBE_PORT=4443 selenium/standalone-chrome:latest
