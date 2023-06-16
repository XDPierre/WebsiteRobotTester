// TODO Add the part that remover the container
// const Docker = require('dockerode');

// // Create a new Docker client
// const docker = new Docker();

// // Function to shut down a Docker container by its container ID
// async function stopContainer(containerId) {
//   const container = docker.getContainer(containerId);
//   await container.stop();
// }
require('dotenv').config();
const axios = require('axios');
const fetch = import('node-fetch').default;

async function waitForGrid() {
  const gridUrl = 'http://selenium-hub:4444/wd/hub/status';
  const cmd = process.argv.slice(2).join(' ');

  while (true) {
    try {
      const response = await axios.get(gridUrl);
      const jsonData = await response.data;
      const isGridReady = jsonData.value.ready;

      if (isGridReady === true) {
        console.error('Selenium Grid is up - executing tests');
        exec(cmd);
        break;
      } else {
        console.log('Waiting for the Grid');
        await sleep(1000);
      }
    } catch (error) {
      console.error('Error occurred while checking Grid status:', error.message);
      await sleep(1000);
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const chrome = require("selenium-webdriver/chrome");
const { Builder, By, Key, until } = require("selenium-webdriver");

async function exec(cmd) {
  // Implement your logic to execute the tests here
  console.log('Executing tests:', cmd);

  let driver = await new Builder()
  .forBrowser("chrome")
  .usingServer("http://selenium-hub:4444/wd/hub/")
  // .setChromeOptions(new chrome.Options().addArguments("--no-sandbox", "--disable-dev-shm-usage"))
  .build();
  
  try {
    // Navigate to Url
    await driver.get(process.env.TESTED_SITE_URL);

    // Click
    let button = driver.findElement(By.css('body > div > section.section-3.wf-section > div > div.w-layout-grid.grid-8 > a:nth-child(3) > div > div.text-block-20'));
   
    let tabs = [];

    do {
      button.click();
      // Get the active tabs
      let windowHandles = await driver.getAllWindowHandles();
      tabs = Array.from(windowHandles);
      console.log('Insufficient tabs available.');
    } while (tabs.length < 2);
    
    await driver.switchTo().window(tabs[1].toString());

    let firstResult;

    do {
      try {
        firstResult = await driver.wait(
          until.elementLocated(By.css("body > #MainPart_lbUsersInLineAheadOfYou")),
          1000
        );
      } catch (error) {
        // Handle any errors or timeouts here
        console.log('Element not found yet. Retrying...');
      }
    } while (!firstResult);
    
    console.log('Posicao Fila:');
    console.log(parseInt(firstResult.getAttribute("textContent")));
    // Shut down the container if the condition is met
    if (parseInt(firstResult.getAttribute("textContent")) > 100000) {
      // stopContainer('taylorshow1');
      console.log('---------------NADA AQUI--------------');
    }
  
  } finally {
    // driver.quit();
  }
}

waitForGrid();