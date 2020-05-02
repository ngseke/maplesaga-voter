require('dotenv').config()
const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 25,
  })
  const page = await browser.newPage()
  await page.setViewport({
    width: 1400,
    height: 600,
    deviceScaleFactor: 1,
  })
  
  await page.goto('https://maplesaga.com/cn/vote', {waitUntil: 'networkidle2'})
  
  await page.waitForSelector('#inputName')

  await page.evaluate(id => {
    $('#inputName')[0].value = id
    $('[data-prize="5210003"]')[0].click()
    $('[type="submit"]')[0].click()
  }, process.env.ID)
  
  await page.waitForNavigation()
  await page.waitForNavigation()
  
  await page.waitForSelector('iframe')
  
  await page.evaluate(() => window.scrollTo(0, 300))

  page.on('console', async msg => {
    await page.evaluate(() => $('#votebutton').click())
    
    await page.waitForNavigation()
    await browser.close()
  })
})()