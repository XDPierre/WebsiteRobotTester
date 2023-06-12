# WebsiteRobotTester
Makes a request in a lot of diferent browser do check the stability of the site.

The docker part is not fully implemented wet

# Run for dependencies of project
npm install
# For testing the code:
docker run -d -p 4444:4444 -p 5900:5900 --shm-size="2g" selenium/standalone-chrome-debug:latest