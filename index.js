
const Docker = require('dockerode');

// Create a new Docker client
const docker = new Docker();

// Function to shut down a Docker container by its container ID
async function stopContainer(containerId) {
  const container = docker.getContainer(containerId);
  await container.stop();
}

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
    console.log(parseInt(firstResult.getAttribute("textContent")));
    // Shut down the container if the condition is met
    if (parseInt(firstResult.getAttribute("textContent")) > 100000) {
      stopContainer('taylorshow1');
    }

    } finally {
      // driver.quit();
    }
  })();
