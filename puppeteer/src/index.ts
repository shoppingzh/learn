import pp from 'puppeteer'

;(async function() {

  const browser = await pp.launch({
    headless: 'new',
  })

  const page = await browser.newPage()
  page.setViewport({
    width: 1920,
    height: 1080
  })
  await page.goto('https://zhengxiaoping.xyz')
  await new Promise(resolve => setTimeout(resolve, 5000))
  // await page.screenshot({
  //   path: './dist/screenshot.png'
  // })
  await page.pdf({
    path: './dist/screenshot.pdf'
  })
  await browser.close()

})()
