import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1200 });
  await page.goto('http://127.0.0.1:80/bonds');
  await page.evaluate(() => {
    window.scrollBy(0, 1000);
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/scroll-screenshot.jpg' });
  await browser.close();
})();
