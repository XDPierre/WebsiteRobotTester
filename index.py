import docker
import time

from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.chrome.options import Options

# Specify the Selenium Grid Hub URL
hub_url = "http://selenium-hub:4444/wd/hub"

# Create Chrome options
chrome_options = Options()

# Define the desired capabilities for Chrome
capabilities = DesiredCapabilities.CHROME.copy()
capabilities["goog:chromeOptions"] = chrome_options.to_capabilities()

# Create a remote WebDriver instance
driver = webdriver.Remote(command_executor=hub_url, options=chrome_options)

print('Passei Driver')
# Open a URL
driver.get('https://www.taylorswifttheerastour.com.br/')

# Find an element by its CSS selector and perform actions
while True:
    element = driver.find_element(By.CSS_SELECTOR, 'body > div > section.section-3.wf-section > div > div.w-layout-grid.grid-8 > a:nth-child(3) > div > div.text-block-20')
    print(element)
    if element:
        element.click()
        break

# Check a specific field
while True:
    try:
        field_value = int(driver.find_element(By.CSS_SELECTOR, 'body > div > section.section-3.wf-section > div > div.w-layout-grid.grid-8 > a:nth-child(3) > div > div.text-block-20').text)
    except ValueError:
        time.sleep(5)
        continue
        
    print('Field value:', field_value)
    # Exit Loop
    if field_value:
        break

# Shut down the container if the condition is met
if field_value > 100000:
    # Connect to the Docker daemon
    client = docker.from_env()
    
    # Get the container by name or ID
    container = client.containers.get('your-container-name')
    
    # Stop and remove the container
    container.stop()
    container.remove()

    # Close the browser
    driver.quit()
