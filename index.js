// TODO Add the part that remover the container
// const Docker = require('dockerode');

// // Create a new Docker client
// const docker = new Docker();

// // Function to shut down a Docker container by its container ID
// async function stopContainer(containerId) {
//   const container = docker.getContainer(containerId);
//   await container.stop();
// }

const chrome = require("selenium-webdriver/chrome");
const { Builder, By, Key, until } = require("selenium-webdriver");

async function main() {

  let driver = await new Builder()
  .forBrowser("chrome")
  .usingServer("http://selenium-hub:4444/wd/hub/")
  // .setChromeOptions(new chrome.Options().addArguments("--no-sandbox", "--disable-dev-shm-usage"))
  .build();
  
  try {
    // Navigate to Url
    await driver.get('https://www.taylorswifttheerastour.com.br/');

    // Click
    let button = driver.findElement(By.css('body > div > section.section-3.wf-section > div > div.w-layout-grid.grid-8 > a:nth-child(3) > div > div.text-block-20'));
    button.click();
  
    // Get the active tabs
    let windowHandles = await driver.getWindowHandles();
    let tabs = Array.from(windowHandles);
  
    // Enter waiting list
    await driver.switchTo().window(tabs.get(1));
  
    let firstResult = await driver.wait(
      until.elementLocated(By.css("body > #MainPart_lbUsersInLineAheadOfYou")),  
      10000
    );
    console.log('Posicao Fila:');
    console.log(parseInt(firstResult.getAttribute("textContent")));
    // Shut down the container if the condition is met
    if (parseInt(firstResult.getAttribute("textContent")) > 100000) {
      // stopContainer('taylorshow1');
      console.log('NADA AQUI');
    }
  
  } finally {
    // driver.quit();
  }
}

main().catch(console.error);