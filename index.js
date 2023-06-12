
const Docker = require('dockerode');

// Create a new Docker client
const docker = new Docker();

// Function to shut down a Docker container by its container ID
async function stopContainer(containerId) {
  const container = docker.getContainer(containerId);
  await container.stop();
}

// Example condition: if a specific container name is running
async function checkConditionAndStopContainer() {
  const containerName = 'your-container-name';

  // Get a list of running containers
  const containers = await docker.listContainers({ all: true });

  // Check if the desired container is running
  const targetContainer = containers.find(container => container.Names.includes(`/${containerName}`));
  if (targetContainer) {
    console.log(`Stopping container ${containerName}...`);
    await stopContainer(targetContainer.Id);
    console.log(`Container ${containerName} stopped.`);
  } else {
    console.log(`Container ${containerName} is not running.`);
  }
}

// Call the function to check the condition and stop the container
checkConditionAndStopContainer()
  .catch(error => console.error(error));

const chrome = require("selenium-webdriver/chrome");
const { Builder, By, Key, until } = require("selenium-webdriver");

 (async function googleSearch() {
   let driver = await new Builder()
    .forBrowser("chrome")
    .usingServer("http://localhost:4444/wd/hub/")
    // .setChromeService(
    // chrome.setDefaultService(
    //   new chrome. ServiceBuilder("./chromedriver").build()
    //   )
    // )
    .build();
  try {
    console.log('Enter');
    // Navigate to Url
    await driver.get('https://www.taylorswifttheerastour.com.br/');
    // Click
    let button = driver.findElement(By.css('body > div > section.section-3.wf-section > div > div.w-layout-grid.grid-8 > a:nth-child(3) > div > div.text-block-20'));
    button.click();

    let firstResult = await driver.wait(
     until.elementLocated(By.css("body > div > section.section-3.wf-section > div > div.w-layout-grid.grid-8 > a:nth-child(3) > div > div.text-block-20")),  
     10000
    );

    console.log(await firstResult.getAttribute("textContent"));
    // Shut down the container if the condition is met
    // if (field_value > 100000) {
    //   // Connect to the Docker daemon
    //   client = docker.from_env()
          
    //   // Get the container by name or ID
    //   container = client.containers.get('taylorshow')

    //   // Stop and remove the container
    //   container.stop()
    //   container.remove()
    // }

    } finally {
      driver.quit();
    }
  })();
