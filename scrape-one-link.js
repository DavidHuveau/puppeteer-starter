const puppeteer = require('puppeteer');

const getData = async () => {
  // const browser = await puppeter.launch();
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true // use devtools when launching Puppeteer
  });
  const page = await browser.newPage();

  // Puppeteer sets an initial page size to 800px x 600px
  await page.setViewport({ width: 1000, height: 500 });
  await page.goto("http://books.toscrape.com/");
  const firstSelector = '#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img';
  await page.click(firstSelector);

  // await page.waitFor(1000) // wait one second
  const resultSelector = '.price_color';
  // Wait for the selector to appear in page
  await page.waitForSelector(resultSelector);

  // To retrieve the content on a page, you must use the evaluate method
  const result = await page.evaluate(() => {
    const title = document.querySelector('h1').innerText;
    const price = document.querySelector('.price_color').innerText;
    return { title, price };
  })

  await browser.close();
  return result;
}

getData()
  .then(value => console.log(value))
  .catch(err => console.log(`error: ${err}`));