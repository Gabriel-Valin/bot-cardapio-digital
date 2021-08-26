const puppeteer = require('puppeteer')
const INPUT = require('./inputs')
const faker = require('faker-br')

const startBot = async () => {
  const browser = await puppeteer.launch({
    headless: false
  })

  const context = browser.defaultBrowserContext()
  await context.overridePermissions('https://cardapio-test.liuv.it/cielo/parceirocielo/cadastro', ['geolocation'])

  const sortedCnpj = INPUT.cnpjArray[Math.floor(Math.random() * INPUT.cnpjArray.length)]
  console.log('')
  const page = await browser.newPage()

  await page.goto('https://cardapio-test.liuv.it/cielo/parceirocielo/cadastro')

  await page.type('#ist', '2')

  for (const input of INPUT.saleCodeArray) {
    await page.type(input, `${Math.floor(Math.random() * 10)}`)
  }

  await page.waitForTimeout(3000)

  await page.click('#btnNext')
  
  await page.waitForTimeout(3000)

  for (const input of INPUT.placeData) {
    if (input === '#cnpj') {
      await page.type(input, sortedCnpj, {delay : 0500})
    }
    if (input === '#telephone') {
      await page.type(input, `${119999999}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`)
    }
    await page.type(input, `LIUV - Teste number: ${Math.floor(Math.random() * 300)}`)
  }

  await page.click('.nice-select')

  await page.click('.list')
  
  await page.click('#btnNext')

  await page.type('#autocomplete_address', 'Avenida Paulista')

  await page.waitForTimeout(2000)

  await page.click('.pac-item')

  await page.waitForTimeout(2000)

  await page.type('#street_number', `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`)

  await page.type('#zip_code', `18611-${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`)

  await page.click('#btnNext')

  await page.waitForTimeout(2000)

  await page.type('#user_name', `${faker.name.firstName()} ${faker.name.lastName()}`)

  await page.type('#user_phone', `${119999999}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`)

  await page.type('#user_email', faker.internet.email())

  await page.type('#password', 'teste@11LIUV')

  await page.type('#confirm_pass', 'teste@11LIUV')

  await page.click('#btnNext')

  await page.evaluate(() => {
    document.querySelector('.checkmark').parentElement.click()
  })
}

startBot()
