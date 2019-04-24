const puppeteer = require("puppeteer");

const getAllUrl = async (browser) => {
  const page = await browser.newPage();
  await page.goto("http://books.toscrape.com/");
  // Wait for the selector to appear in page
  await page.waitForSelector('body');

  const result = await page.evaluate(() => {
    const links = [...document.querySelectorAll("article.product_pod > div > a")];
    // debugger
    return links.map(link => link.href);
  });
  page.close();
  // console.log(result);
  return result;
}

const getRandomInt = (min, max) => {
  return Math.random() * (max - min) + min;
}

const getDataFromUrl = async (browser, url) => {
  const page = await browser.newPage();
  // Wait a random number of msec
  await page.waitFor(getRandomInt(100, 3000));
  await page.goto(url);
  const resultSelector = ".price_color";
  // Wait for the selector to appear in page
  await page.waitForSelector(resultSelector);

  const result = await page.evaluate(() => {
    const title = document.querySelector("h1").innerText
    const price = document.querySelector(".price_color").innerText;
    return { title, price };
  });
  page.close();
  // console.log(url, result);
  return result;
}

const scrap = async () => {
  // const browser = await puppeter.launch();
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true // use devtools when launching Puppeteer
  });

  const urlList = await getAllUrl(browser);
  const results = await Promise.all(
    urlList.slice(0,5).map(url => getDataFromUrl(browser, url))
  );

  browser.close();
  return results;
}

scrap()
  .then(results => console.log(results))
  .catch(err => console.log(`>error: ${err}`));