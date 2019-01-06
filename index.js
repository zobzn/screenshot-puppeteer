const puppeteer = require("puppeteer");

const screenshot = (() => {
  return async function(url, width = 1024) {
    // 1. Launch the browser
    const browser = await puppeteer.launch({
      defaultViewport: {
        width: width,
        height: 768,
        isMobile: false,
        hasTouch: false,
        isLandscape: false
      }
    });

    // 2. Open a new page
    const page = await browser.newPage();

    // 3. Navigate to URL
    await page.goto(url);

    // 4. Take screenshot
    await page.screenshot({
      omitBackground: true,
      path: `screenshot-${width}.png`,
      fullPage: true
    });

    await browser.close();
  };
})();

(async () => {
  const url = "http://zobzn.com/";

  const promises = [320, 480, 640, 1024].map(width => {
    return screenshot(url, width);
  });

  await Promise.all(promises);
})();
