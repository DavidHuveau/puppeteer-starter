const puppeteer = require('puppeteer');

const getScreenShot = async () => {
  // const browser = await puppeter.launch();
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250, // slow down by 250ms
    devtools: true // use devtools when launching Puppeteer
  });
  const page = await browser.newPage();
  // Puppeteer sets an initial page size to 800px x 600px
  await page.setViewport({ width: 1000, height: 500 });
  await page.goto("https://wildcodeschool.fr/");
  await page.screenshot({ path: "screenshot.png" })

  await page.evaluate(() => console.log(`url is ${location.href}`));
  // The test will now stop executing, and chromium will stop in debug mode.
  await page.evaluate(() => {debugger});
  await browser.close();
}

getScreenShot();
